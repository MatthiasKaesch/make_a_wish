import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Profile from './Profile';

describe('<Profile /> HTML', () => {
  test('includes "Personal Profile" as <h2>', async () => {
    render(<Profile />);

    const headerElement = await screen.findByText('Personal Profile', { exact: false });
    expect(headerElement).toBeInTheDocument();
  });
  test('Renders "USER ID" as <h3>', async () => {
    render(<Profile />);
    const headerElement = await screen.findByText('USER ID', { exact: false });
    expect(headerElement).toBeInTheDocument();
  });
  test('Renders "Back" as <button>', async () => {
    render(<Profile />);
    const buttonElement = await screen.findByText('Back', { exact: false });
    expect(buttonElement).toBeInTheDocument();
  });
  test('Renders "Show" as <button>', async () => {
    render(<Profile />);
    const buttonElement = await screen.findByText('Show', { exact: false });
    expect(buttonElement).toBeInTheDocument();
  });
});

describe('<Profile /> Show button', () => {
  test('toggles UserId', async () => {
    render(<Profile />);
    const showButtonElement = await screen.findByText('Show', { exact: true });
    const information = await screen.findByText('Confidential', { exact: false });
    userEvent.click(showButtonElement);
    expect(information).toHaveTextContent('UserID');
    userEvent.click(showButtonElement);
    expect(information).toHaveTextContent('Confidential information');
  });
});
