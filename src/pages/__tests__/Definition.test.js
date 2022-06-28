import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
// import * as router from 'react-router'
import {  MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Definition from '../Definition';


const favoritesMock = ['squat', 'snatch', 'clean', 'thruster'];

const mockedUsedNavigate = jest.fn();

afterEach(() => {
    cleanup();
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      word: 'squat',
    }),
    useNavigate: () => mockedUsedNavigate,
  }));

  
test('<Definition />', () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    expect(screen.container).toMatchSnapshot();
});

test('Back to home', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const backButton = screen.getByTestId('back-button');
    await fireEvent.click(backButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/')
    
});

test('Back to favorites', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const favButton = screen.getByTestId('favorites-button');
    await fireEvent.click(favButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/favorites')
});
test('render word search in screen', () => {
    const history = createMemoryHistory();
    const url = '/definition/squat';
    history.push(url);
    render(
        <MemoryRouter>
        <Definition favorites={favoritesMock} />
        </MemoryRouter>
    );     
    expect(screen.queryByTestId('word').textContent).toBe(favoritesMock[0]);
});
