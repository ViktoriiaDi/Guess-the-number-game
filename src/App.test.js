import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

  test('Відображає головний заголовок гри', () => {
    render(<App />);
    const headerElement = screen.getByText(/Guess the Number/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('Поле введення має бути типу number для коректних даних', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Enter number/i);
    expect(inputElement).toHaveAttribute('type', 'number');
  });

  test('Відображає інструкцію користувачу при старті', () => {
    render(<App />);
    const welcomeMsg = screen.getByText(/Enter a number between 1 and 100/i);
    expect(welcomeMsg).toBeInTheDocument();
  });

  test('Кнопки Check та Again присутні на екрані', () => {
    render(<App />);
    const checkBtn = screen.getByRole('button', { name: /Check/i });
    const againBtn = screen.getByRole('button', { name: /Again/i });
    expect(checkBtn).toBeInTheDocument();
    expect(againBtn).toBeInTheDocument();
  });

  test('Дозволяє змінювати значення в полі введення', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter number/i);
    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');
  });

  test('Початкова кількість спроб дорівнює 0', () => {
    render(<App />);
    const attemptsMsg = screen.getByText(/Attempts: 0/i);
    expect(attemptsMsg).toBeInTheDocument();
  });

  test('Поле історії порожнє при старті гри', () => {
    render(<App />);
    const historyElement = screen.getByText(/History:/i);
    expect(historyElement).toHaveTextContent('History:');
  });

  test('Кнопка Again скидає повідомлення до початкового', () => {
    render(<App />);
    const againBtn = screen.getByRole('button', { name: /Again/i });
    
    fireEvent.click(againBtn);
    expect(screen.getByText(/New game started!/i)).toBeInTheDocument();
  });

test('Виводить попередження, якщо введене число більше 100', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter number/i);
    const checkBtn = screen.getByRole('button', { name: /Check/i });

    fireEvent.change(input, { target: { value: '105' } });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Number must be between 1 and 100!/i)).toBeInTheDocument();
  });

  test('Виводить попередження, якщо введене число більше 100', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter number/i);
    const checkBtn = screen.getByRole('button', { name: /Check/i });

    fireEvent.change(input, { target: { value: '-105' } });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Number must be between 1 and 100!/i)).toBeInTheDocument();
  }); 

  test('Таймер отримує сигнал для скидання після натискання New Game', () => {
    render(<App />);
    const againBtn = screen.getByRole('button', { name: /Again/i }); 
    
    fireEvent.click(againBtn);
    expect(screen.getByText(/New game started!/i)).toBeInTheDocument();
  });