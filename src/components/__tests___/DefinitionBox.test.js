import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import DefinitionBox from '../DefinitionBox';


afterEach(() => {
    cleanup();
});

const mockdata = {
    meanings: [
       {
        definition: 'the one that you got birth',
        example: 'George is son of Martha' 
       }
    ],
    artOfSpeech: 'sustantive',
    phonetic: '/son/', 
}

test('<DefinitionBox />', () => {
    render(<DefinitionBox meanings={mockdata.meanings} partOfSpeech={mockdata.partOfSpeech} phonetic={mockdata.phonetic} />, );
    expect(screen.container).toMatchSnapshot();
});