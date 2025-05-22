import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset window.scrollTo mock before each test
    window.scrollTo = jest.fn();
  });

  it('should not be visible initially', () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should become visible when scrolled down', () => {
    render(<ScrollToTop />);
    
    // Simulate scroll
    act(() => {
      window.pageYOffset = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should hide when scrolled back to top', () => {
    render(<ScrollToTop />);
    
    // First scroll down
    act(() => {
      window.pageYOffset = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();

    // Then scroll back to top
    act(() => {
      window.pageYOffset = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should scroll to top when clicked', () => {
    render(<ScrollToTop />);
    
    // Make button visible
    act(() => {
      window.pageYOffset = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should have correct accessibility attributes', () => {
    render(<ScrollToTop />);
    
    // Make button visible
    act(() => {
      window.pageYOffset = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
  });
}); 