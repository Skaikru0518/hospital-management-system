import type { User } from './UserType';

export type AuthResponseType = {
  access_token: string;
  user: User;
};
