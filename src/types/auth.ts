export interface User {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface RegisteredUser extends User {
  password: string;
}

export interface CurrentUser extends User {
  id: number;
  role: string;
}

export interface LoggedUser extends CurrentUser {
  jti: string;
  created_at: string;
  updated_at: string;
}

export interface UpdatedUser extends RegisteredUser {
  current_password: string
}