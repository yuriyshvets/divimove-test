export interface CommonUserFields {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserInputs extends CommonUserFields {
  peers: Peer[];
}

export interface AddUserInputs extends CommonUserFields {
  peer_ids: number[];
}

export interface Peer extends UserInputs {
  id: number;
}

export interface User extends Peer {
  created_at: string;
  updated_at: string;
  url: string;
}
