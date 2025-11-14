import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from '../ImageGallery';

describe('ImageGallery', () => {
  const mockImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
  ];

  it('should render gallery with images', () => {
    render(<ImageGallery images={mockImages} />);
    expect(screen.getByAltText(/Изображение товара 1/)).toBeInTheDocument();
  });

  it('should show counter with current image index', () => {
    render(<ImageGallery images={mockImages} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should navigate to next image on next button click', () => {
    render(<ImageGallery images={mockImages} />);
    const nextButton = screen.getByLabelText('Следующее изображение');
    
    fireEvent.click(nextButton);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('should navigate to previous image on prev button click', () => {
    render(<ImageGallery images={mockImages} />);
    const nextButton = screen.getByLabelText('Следующее изображение');
    const prevButton = screen.getByLabelText('Предыдущее изображение');
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should loop to last image when clicking prev on first image', () => {
    render(<ImageGallery images={mockImages} />);
    const prevButton = screen.getByLabelText('Предыдущее изображение');
    
    fireEvent.click(prevButton);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('should loop to first image when clicking next on last image', () => {
    render(<ImageGallery images={mockImages} />);
    const nextButton = screen.getByLabelText('Следующее изображение');
    
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should render placeholder when no images provided', () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText('📷 Нет изображений')).toBeInTheDocument();
  });

  it('should not show counter for single image', () => {
    render(<ImageGallery images={['/single-image.jpg']} />);
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('should disable navigation buttons for single image', () => {
    render(<ImageGallery images={['/single-image.jpg']} />);
    const nextButton = screen.getByLabelText('Следующее изображение');
    const prevButton = screen.getByLabelText('Предыдущее изображение');
    
    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });
});

