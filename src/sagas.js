import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from './axiosConfig';
import { GET_USERS_FETCH, GET_USERS_SUCCESS } from './actions';

function* workGetUsersFetch() {
  try {
    const response = yield call(axiosInstance.get, '/users');
    yield put({ type: GET_USERS_SUCCESS, users: response.data });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function* mySaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
}

export default mySaga;
