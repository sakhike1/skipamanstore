import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

// Mock child components
jest.mock('../Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../Footer', () => () => <div data-testid="mock-footer">Footer</div>);
jest.mock('../../ui/ScrollToTop', () => () => <div data-testid="mock-scroll-to-top">ScrollToTop</div>);

describe('Layout', () => {
  it('renders header, main content, footer, and scroll to top button', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    
    render(<Layout>{testContent}</Layout>);
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-scroll-to-top')).toBeInTheDocument();
  });

  it('renders children in the main content area', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    
    render(<Layout>{testContent}</Layout>);
    
    const mainContent = screen.getByTestId('test-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent.textContent).toBe('Test Content');
  });

  it('maintains proper layout structure', () => {
    render(<Layout><div>Test</div></Layout>);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-grow');
  });
}); 