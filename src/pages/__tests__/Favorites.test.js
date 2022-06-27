import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router'
import Favorites from '../Favorites';
import userEvent from '@testing-library/user-event'

const fovarites = ['test', 'word','love'];
const setFavorites = jest.fn();
const ui = userEvent.setup()
const navigate = jest.fn()

// const mockSetState = jest.fn();
// jest.mock('react', () => ({
//   useState: initial => [initial, mockSetState]
// }));

const deleteWord = jest.fn(() => Favorites);


beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})
afterEach(() => {
    cleanup();
});
test('<Favorites />', () => {
    render(<MemoryRouter><Favorites favorites={fovarites} setFavorites={setFavorites} /></MemoryRouter>, );
    expect(screen.container).toMatchSnapshot();
    expect(screen.getByText(/MY FAVORITES WORDS/i)).toBeInTheDocument();
});

test('Shows list of words saved', () => {
    render(<MemoryRouter><Favorites favorites={fovarites} /></MemoryRouter>,);
    const words = screen.queryAllByTestId('word-saved');
    expect(words.length).toBe(fovarites.length);
});

test('Goes to definition page', async () => {
  render(<MemoryRouter><Favorites favorites={fovarites} /></MemoryRouter>,);
  const word = screen.queryAllByTestId('word-saved')[0].textContent;
  await ui.click(screen.queryAllByTestId('word-saved')[0])
  expect(navigate).toHaveBeenCalledWith(`/definition/${word}`)
});

test('Back to home', async () => {
  render(<MemoryRouter><Favorites favorites={fovarites} /></MemoryRouter>,);
  const backButton = screen.getByTestId('back-button');
  await fireEvent.click(backButton);
  expect(navigate).toHaveBeenCalledWith('/')
});

test('Delete favorite word', async () => {
  render(<MemoryRouter><Favorites favorites={fovarites} setFavorites={deleteWord} /></MemoryRouter>,);
  const deleteButton = screen.queryAllByTestId('delete-button')[0];
  await fireEvent.click(deleteButton);
  expect(screen.queryAllByTestId('word-saved')[0].textContent).toBe('test');
});