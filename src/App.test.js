import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import rootSaga from '../src/sagas';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

let store;

beforeEach(() => {
  store = mockStore({
    myFirstReducer: {
      users: [],
    },
  });

  sagaMiddleware.run(rootSaga);
});

const renderWithProvider = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('renders UserDetails component with Get Users button', async () => {
  await act(async () => {
    renderWithProvider(<App />);
  });
  const getUsersButton = screen.getByText(/get users/i);
  expect(getUsersButton).toBeInTheDocument();
});
