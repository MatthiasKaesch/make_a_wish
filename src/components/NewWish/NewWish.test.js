import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewWish from './NewWish';

describe('<NewWish /> Component', () => {
  test('renders "New Wish" as <h2>', () => {
    render(<NewWish />);
    const headerElement = screen.getByText('New Wish', { exact: true });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders "Title" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Title', { exact: true });
    expect(labelElement).toBeInTheDocument();
  });

  test('renders "Price" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Price', { exact: true });
    expect(labelElement).toBeInTheDocument();
  });

  test('renders "Share With" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Share With', { exact: true });
    expect(labelElement).toBeInTheDocument();
  });

  test('renders "Make a Wish" as <button>', () => {
    render(<NewWish />);
    const buttonElement = screen.getByText('Share With', { exact: true });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders "Cancel" as <button>', () => {
    render(<NewWish />);
    const buttonElement = screen.getByText('Cancel', { exact: false });
    expect(buttonElement).toBeInTheDocument();
  });
});
