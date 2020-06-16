import { User, AddUserInputs, UserInputs } from '../../types/users';

export interface AddNewUserAction {
  type: string;
  payload: { user: AddUserInputs };
}

export interface AddUserAction {
  type: string;
  payload: { user: UserInputs };
}

export interface SetUsersAction {
  type: string;
  payload: {
    users: User[];
  };
}

export interface GetUsersAction {
  type: string;
}

export interface DeleteUserAction {
  type: string;
  payload: {
    id: number;
  };
}

export type ActionTypes = AddUserAction | SetUsersAction | GetUsersAction | DeleteUserAction;
