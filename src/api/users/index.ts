import API from '../index';
import { User } from '../../types/users';

export const requestGetUsers = () => {
  return API.get<User[]>(`/users`);
};

export const requestCreateUser = (payload) => {
  return API.post(`/users`, payload);
};

export const requestDeleteUser = (id) => {
  return API.delete(`/users/${id}`);
};

export const requestUpdateUser = (payload) => {
  return API.put(`/users/${payload.user.id}`, payload);
};

export const requestLookupUsers = (payload) => {
  return API.get<User[]>(`/users/lookup`, { params: { q: payload } });
};
