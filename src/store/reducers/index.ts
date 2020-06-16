import { ADD_USER, DELETE_USER, SET_USERS } from '../actionTypes';
import { State } from './types';
import { ActionTypes } from '../actions/types';

const initialState = {
  users: [],
  errors: [],
};

export default function (state: State = initialState, action: ActionTypes | any): State {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, users: [...state.users, action.payload.user] };
    }
    case SET_USERS: {
      return { ...state, users: action.payload.users };
    }
    case DELETE_USER: {
      return { ...state, users: [...state.users.filter((user) => user.id !== action.payload.id)] };
    }
    default:
      return state;
  }
}
