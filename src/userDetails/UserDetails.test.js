import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UserDetails from './UserDetails';
import myFirstReducer from '../reducer'; 

const rootReducer = combineReducers({
  myFirstReducer
});
const store = createStore(rootReducer);

const mockUsers = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com', website: 'www.johndoe.com' },
  { id: 2, name: 'Jane Smith', phone: '098-765-4321', email: 'jane@example.com', website: 'www.janesmith.com' },
];

beforeEach(() => {
  store.dispatch({ type: 'SET_USERS', payload: mockUsers });
});

test('calls handleFetchDetails when "Get users" button is clicked', () => {
  render(
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
  const getUsersButton = screen.getByText('Get users');
  fireEvent.click(getUsersButton);
  
});

