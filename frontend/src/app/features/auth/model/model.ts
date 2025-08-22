export interface User {
  name: string;
  email: string;
  password?: string; // not always needed
  role?: string;
}

export interface AuthUser {
  name?: string;
  email: string;
  password: string;
  role?: string;
}
