import {
  ADD_USER,
  ADD_USER_ASYNC,
  GET_USERS_ASYNC,
  SET_USERS,
  DELETE_USER,
  DELETE_USER_ASYNC,
  UPDATE_USER,
  UPDATE_USER_ASYNC,
} from '../actionTypes';
import {
  AddUserAction,
  GetUsersAction,
  SetUsersAction,
  DeleteUserAction,
  AddNewUserAction,
} from './types';
import { User, AddUserInputs } from '../../types/users';

export const addUser = (user: User): AddUserAction => ({
  type: ADD_USER,
  payload: {
    user,
  },
});

export const addUserAsync = (user: AddUserInputs): AddNewUserAction => ({
  type: ADD_USER_ASYNC,
  payload: {
    user,
  },
});

export const updateUser = (user: User): AddUserAction => ({
  type: UPDATE_USER,
  payload: {
    user,
  },
});

export const updateUserAsync = (user: AddUserInputs): AddNewUserAction => ({
  type: UPDATE_USER_ASYNC,
  payload: {
    user,
  },
});

export const setUsers = (users: User[]): SetUsersAction => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const getUsersAsync = (): GetUsersAction => ({
  type: GET_USERS_ASYNC,
});

export const deleteUser = (id: number): DeleteUserAction => ({
  type: DELETE_USER,
  payload: {
    id,
  },
});

export const deleteUserAsync = (id: number): DeleteUserAction => ({
  type: DELETE_USER_ASYNC,
  payload: {
    id,
  },
});
