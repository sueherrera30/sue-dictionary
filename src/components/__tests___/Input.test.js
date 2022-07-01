import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';

import Input from '../Input';

afterEach(() => {
    cleanup();
});

const mockedUsedNavigate = jest.fn();
const handleSearchMocked = jest.fn(() => mockedUsedNavigate);
const saveValueMocked = jest.fn();
const wordMocked = 'hello';
const message = {
    state: false,
    content: 'please add a word!',
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));

  describe('testing input component', () => {  
    let inputComponent = <MemoryRouter>
            <Input handleSearch={handleSearchMocked} saveValue={saveValueMocked} word={wordMocked} message={message} />
        </MemoryRouter>;
        test('<Input />', () => {
            render(inputComponent);
            expect(screen.container).toMatchSnapshot();
            expect(screen.getByTestId('input').tagName).toBe('INPUT');
        });

        test('Goes to definition page when enter', async () => {
            render(inputComponent);
            const input = screen.getByTestId("input");
            fireEvent.change(input, { target: { value: 'hello' } });
            fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13});
       
            // const inputvalue = screen.getByTestId('input').value;
            // await fireEvent.keyDown(screen.getByTestId('input'), {key: 'enter', keyCode: 13})
            // expect(mockedUsedNavigate).toHaveBeenCalledWith(`/definition/${inputvalue}`)
            // expect(handleSearchMocked.mock.calls.length).toBe(1);
            // expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        });
        // test('save word in enter', async () => {
        //     render(inputComponent);
        //     await fireEvent.change(screen.getByTestId('input'), { target: { value: 'hello'}})
        //     expect(enterMockfuntion).toHaveBeenCalledTimes(1);
        //     expect(enterMockfuntion).toHaveBeenCalledWith({
        //         content: 'hello',
        //     });
        // });

  });