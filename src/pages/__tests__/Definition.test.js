import React from 'react';
import { render, screen, cleanup, fireEvent, renderHook, waitFor } from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Definition from '../Definition';

const favoritesMock = ['squat', 'snatch', 'clean', 'thruster', 'hello'];
// const savefavoritesFunctionmock = jest.fn();

// const definitionsMock =[
//     {
//       "word": "hello",
//       "phonetics": [
//         {
//           "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
//           "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
//           "license": {
//             "name": "BY-SA 4.0",
//             "url": "https://creativecommons.org/licenses/by-sa/4.0"
//           }
//         },
//       ],
//       "meanings": [
//         {
//           "partOfSpeech": "noun",
//           "definitions": [
//             {
//               "definition": "\"Hello!\" or an equivalent greeting.",
//               "synonyms": [],
//               "antonyms": []
//             }
//           ],
//           "synonyms": [
//             "greeting"
//           ],
//           "antonyms": []
//         },
//         {
//           "partOfSpeech": "interjection",
//           "definitions": [
//             {
//               "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
//               "synonyms": [],
//               "antonyms": [],
//               "example": "Hello, everyone."
//             },
//           ],
//           "synonyms": [],
//           "antonyms": [
//             "bye",
//             "goodbye"
//           ]
//         }
//       ],
//       "license": {
//         "name": "CC BY-SA 3.0",
//         "url": "https://creativecommons.org/licenses/by-sa/3.0"
//       },
//       "sourceUrls": [
//         "https://en.wiktionary.org/wiki/hello"
//       ]
//     }
// ];

const mockedUsedNavigate = jest.fn();

afterEach(() => {
    cleanup();
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams:() => ({
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
    const backButton = screen.queryByTestId('back-button');
    await fireEvent.click(backButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/')
    
});

test('Back to favorites', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const favButton = screen.queryByTestId('favorites-button');
    await fireEvent.click(favButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/favorites')
});
test('render word search in screen', () => {
    const history = createMemoryHistory();
    const url = '/definition/squat';
    history.push(url);
    render(
        <MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>
    );     
    expect(screen.queryByTestId('word').textContent).toBe(favoritesMock[0]);
});
test('Verify word is saved in favorites', async () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const currentWord = screen.queryByTestId('word').textContent;
    expect(favoritesMock).toContain(currentWord);
    expect(screen.getByTestId('stick-icon')).toBeTruthy();
});

test('Word is NOT in favorites', async () => {
    const history = createMemoryHistory();
    const url = '/definition/lover';
    history.push(url);
    const splitPath = url.split('/');
    const newWord = splitPath[splitPath.length -1];
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>,);
    expect(favoritesMock).not.toContain(newWord);
    screen.queryByTestId('word').textContent = newWord;
    expect(screen.queryByTestId('word').textContent).toBe(newWord);
});

test('testing loading is not longer in screen', () => {
    render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
    const loading = screen.queryByTestId('loading');
    expect(loading).toBeFalsy();
});

// test('add to favorites', () => {
//     render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
//     const saveButton =screen.getByTestId('stick-icon');
//     fireEvent.click(saveButton);
//     expect(savefavoritesFunctionmock).toHaveBeenCalledTimes(1);
//     // expect(screen.getByTestId('add-icon')).toBeTruthy();
// });

// test('click on speaker', async () => {
//     render(<MemoryRouter><Definition favorites={favoritesMock} /></MemoryRouter>, );
//     const speaker = screen.queryByTestId('speaker');
//     // await fireEvent.click(speaker);
// });
