import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from './interceptors';
import { GET_USERS_FETCH, GET_USERS_SUCCESS, DELETE_USERS, UPDATE_USER } from './actions';

function* workGetUsersFetch() {
  try {
    const response = yield call(axiosInstance.get, '/users');
    yield put({ type: GET_USERS_SUCCESS, users: response.data });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function* workDeleteUsers(action) {
  console.log(action,'action');
  const userId = action.payload;
  try {
    const response = yield call(axiosInstance.delete, `/users/${userId}`);
    console.log('User deleted successfully', response.data);
    yield put({ type: GET_USERS_FETCH });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

function* workUpdateUser(action) {
  console.log(action,'action in edit');
  try {
    const response = yield call(axiosInstance.put, `/users/${action.payload.id}`, action.payload);
    console.log('User updated successfully', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

function* mySaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
  yield takeEvery(DELETE_USERS, workDeleteUsers);
  yield takeEvery(UPDATE_USER, workUpdateUser);
}

export default mySaga;
