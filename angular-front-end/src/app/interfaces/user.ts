export interface User {
  name: string,
  username: string,
  role: UserRole,
  email: string,
  password: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
