import { put, takeEvery, all, call } from 'redux-saga/effects';
import {
  requestCreateUser,
  requestGetUsers,
  requestDeleteUser,
  requestUpdateUser,
} from '../../api/users';
import { addUser, deleteUser, setUsers, updateUser } from '../actions';

function* addUserAsync(payload) {
  try {
    const data = yield call(requestCreateUser, payload.payload);
    yield put(addUser(data.data));
  } catch (e) {
    if (e.response?.data?.email) {
      alert(e.response.data.email);
    } else {
      alert(e.message);
    }
  }
}

function* watchAddUserAsync() {
  yield takeEvery('ADD_USER_ASYNC', addUserAsync);
}

function* getUsersAsync() {
  try {
    const data = yield call(requestGetUsers);
    yield put(setUsers(data.data));
  } catch (e) {
    alert(e.message);
  }
}

function* watchGetUsersAsync() {
  yield takeEvery('GET_USERS_ASYNC', getUsersAsync);
}

function* deleteUserAsync(payload) {
  try {
    yield call(requestDeleteUser, payload.payload.id);
    yield put(deleteUser(payload.payload.id));
  } catch (e) {
    alert(e.message);
  }
}

function* watchDeleteUserAsync() {
  yield takeEvery('DELETE_USER_ASYNC', deleteUserAsync);
}

function* updateUserAsync(payload) {
  try {
    const data = yield call(requestUpdateUser, payload.payload);
    yield put(updateUser(data.data));
    yield getUsersAsync();
  } catch (e) {
    alert(e.message);
  }
}

function* watchUpdateUserAsync() {
  yield takeEvery('UPDATE_USER_ASYNC', updateUserAsync);
}

export default function* rootSaga() {
  yield all([
    watchAddUserAsync(),
    watchGetUsersAsync(),
    watchDeleteUserAsync(),
    watchUpdateUserAsync(),
  ]);
}
