import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';

import SavedWords from '../SavedWords';

const mockedUsedNavigate = jest.fn();

afterEach(() => {
    cleanup();
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));

test('<SavedWords />', () => {
    render(<MemoryRouter><SavedWords /></MemoryRouter>, );
    expect(screen.container).toMatchSnapshot();
    expect(screen.getByText('MY FAV WORDS')).toBeTruthy();
});

test('Back to favorites', async () => {
    render(<MemoryRouter><SavedWords /></MemoryRouter>, );
    const favButton = screen.queryByTestId('favorites-button');
    await fireEvent.click(favButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/favorites')
});