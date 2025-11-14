import { describe, it, expect, vi } from 'vitest';
import { renderBasic as render, screen, userEvent } from '@/test/test-utils';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: vi.fn(),
  };

  it('отображает информацию о текущих элементах', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText(/показано 1–10 из 100 объявлений/i)).toBeInTheDocument();
  });

  it('отображает кнопки навигации', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByTitle('Первая страница')).toBeInTheDocument();
    expect(screen.getByTitle('Предыдущая страница')).toBeInTheDocument();
    expect(screen.getByTitle('Следующая страница')).toBeInTheDocument();
    expect(screen.getByTitle('Последняя страница')).toBeInTheDocument();
  });

  it('отключает кнопки "назад" на первой странице', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    expect(screen.getByTitle('Первая страница')).toBeDisabled();
    expect(screen.getByTitle('Предыдущая страница')).toBeDisabled();
  });

  it('отключает кнопки "вперед" на последней странице', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    
    expect(screen.getByTitle('Следующая страница')).toBeDisabled();
    expect(screen.getByTitle('Последняя страница')).toBeDisabled();
  });

  it('вызывает onPageChange при клике на номер страницы', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);
    
    const pageButton = screen.getByRole('button', { name: '2' });
    await user.click(pageButton);
    
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('вызывает onPageChange при клике на "Следующая"', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={handlePageChange} />);
    
    const nextButton = screen.getByTitle('Следующая страница');
    await user.click(nextButton);
    
    expect(handlePageChange).toHaveBeenCalledWith(6);
  });

  it('не отображается при отсутствии страниц', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={0} />
    );
    
    expect(container).toBeEmptyDOMElement();
  });
});

