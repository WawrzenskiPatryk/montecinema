export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface UpdateUserCredentials extends RegisterCredentials {
  currentPassword: string;
}
