export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  fullName: string;
  roles: string[];
}
