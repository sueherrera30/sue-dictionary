import useFetch from "../hooks/useFetch";
import { renderHook, waitFor } from '@testing-library/react';

const definitions =[
                {
                  "word": "hello",
                  "phonetics": [
                    {
                      "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
                      "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
                      "license": {
                        "name": "BY-SA 4.0",
                        "url": "https://creativecommons.org/licenses/by-sa/4.0"
                      }
                    },
                  ],
                  "meanings": [
                    {
                      "partOfSpeech": "noun",
                      "definitions": [
                        {
                          "definition": "\"Hello!\" or an equivalent greeting.",
                          "synonyms": [],
                          "antonyms": []
                        }
                      ],
                      "synonyms": [
                        "greeting"
                      ],
                      "antonyms": []
                    },
                    {
                      "partOfSpeech": "interjection",
                      "definitions": [
                        {
                          "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
                          "synonyms": [],
                          "antonyms": [],
                          "example": "Hello, everyone."
                        },
                      ],
                      "synonyms": [],
                      "antonyms": [
                        "bye",
                        "goodbye"
                      ]
                    }
                  ],
                  "license": {
                    "name": "CC BY-SA 3.0",
                    "url": "https://creativecommons.org/licenses/by-sa/3.0"
                  },
                  "sourceUrls": [
                    "https://en.wiktionary.org/wiki/hello"
                  ]
                }
              ];

const mockedData = {
loading: false,
definitions,
error: null,
};

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockRestore();
});

// it("should return data after fetch", async () => {
//     // Mock API
//     jest.spyOn(global, "fetch").mockImplementation(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(definitions),
//       })
//     );

//     // Execute
//     const { result } = renderHook(() =>
//       useFetch('hello')
//     );    
//     // Assert
//     expect(result.current).toStrictEqual({
//       loading: false,
//       data: definitions,
//       error: null,
//     });
//     await waitFor(() => {
//         expect(result.current).toStrictEqual(mockedData);
//     });
//     console.log('resullllttttttttttttttttt', result.current);
// });

it("should return data after fetch", async () => {
    // Mock API
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      })
    );
    //execute
    // const { result } = renderHook(() =>
    //  useFetch('hello')
    // );
    // await waitFor(() => {
    //     expect(result.current).toStrictEqual(mockedData);
    // });
    // console.log('resullllttttttttttttttttt', result.current);
  });
