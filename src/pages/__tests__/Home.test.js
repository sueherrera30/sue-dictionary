import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import Home from '../Home';


test('Testing router home', async () => {
    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,
    )
    expect(screen.getByText(/MY DICTIONARY/i)).toBeInTheDocument() 
});