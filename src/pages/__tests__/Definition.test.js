import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router'

import Definition from '../Definition';


const favoritesMock = ['squat', 'snatch', 'clean', 'thruster'];
const navigate = jest.fn()
const location = jest.fn()

afterEach(() => {
    cleanup();
});

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    jest.spyOn(router, 'useLocation').mockImplementation(() => location)
})

test('<Definition />', () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    expect(screen.container).toMatchSnapshot();
});

test('Back to home', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const backButton = screen.getByTestId('back-button');
    await fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith('/')
});

test('Back to favorites', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const favButton = screen.getByTestId('favorites-button');
    await fireEvent.click(favButton);
    expect(navigate).toHaveBeenCalledWith('/favorites');
});

test('verify is a word saved', () => {
   render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>,);
   const word = screen.queryByTestId('word').outerHTML;
   console.log(word);
  // expect(location.pathname).toBe(`/definition/${word}`);
});