import defaultClient from '@/services/api/defaultClient.js';
import endpoint from '@/services/api/endpoint.js';
import { LoginCredentials, RegisterCredentials, UpdateUserCredentials } from '@/types/auth';

export function setAuthHeader(authHeader: string) {
  defaultClient.defaults.headers.common['Authorization'] = authHeader;
}

export function removeAuthHeader() {
  delete defaultClient.defaults.headers.common['Authorization'];
}

export async function login(credentials: LoginCredentials) {
  return await defaultClient.post(endpoint.LOGIN, {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });
}

export async function register(credentials: RegisterCredentials) {
  return await defaultClient.post(endpoint.REGISTER, {
    user: {
      email: credentials.email,
      password: credentials.password,
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      date_of_birth: credentials.dateOfBirth,
    },
  });
}

export async function updateUser(credentials: UpdateUserCredentials) {
  return await defaultClient.patch(endpoint.USER, {
    user: {
      email: credentials.email,
      password: credentials.password,
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      date_of_birth: credentials.dateOfBirth,
      current_password: credentials.currentPassword,
    },
  });
}
