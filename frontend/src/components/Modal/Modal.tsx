import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable?.focus();
              e.preventDefault();
            }
          }
        };

        document.addEventListener('keydown', handleTab);
        firstFocusable?.focus();

        return () => {
          document.removeEventListener('keydown', handleEscape);
          document.removeEventListener('keydown', handleTab);
          document.body.style.overflow = '';
          previouslyFocusedElement.current?.focus();
        };
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className={styles.overlay} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        className={`${styles.modal} ${styles[`modal--${size}`]}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="document"
      >
        {title && (
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть модальное окно"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

