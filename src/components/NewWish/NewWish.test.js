import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewWish from './NewWish';

describe('<NewWish /> HTML Test', () => {
  test('Renders "New Wish" as <h2>', () => {
    // Arrange
    render(<NewWish />);

    // Act
    // ..nothing here for now

    //Assert

    const headerElement = screen.getByText('New Wish', { exact: false });
    expect(headerElement).toBeInTheDocument();
  });

  test('Renders "Title" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Title', { exact: false });
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders "Price" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Price', { exact: false });
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders "Share With" as <label>', () => {
    render(<NewWish />);
    const labelElement = screen.getByText('Share With', { exact: false });
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders "Make a Wish" as <button>', () => {
    render(<NewWish />);
    const buttonElement = screen.getByText('Share With', { exact: false });
    expect(buttonElement).toBeInTheDocument();
  });

  test('Renders "Cancel" as <button>', () => {
    render(<NewWish />);
    const buttonElement = screen.getByText('Cancel', { exact: false });
    expect(buttonElement).toBeInTheDocument();
  });
});
