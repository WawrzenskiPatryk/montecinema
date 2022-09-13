import defaultClient from '@/services/api/defaultClient.js';
import endpoint from '@/services/api/endpoint.js';

export function setAuthHeader(authHeader) {
  defaultClient.defaults.headers.common['Authorization'] = authHeader;
}

export function removeAuthHeader() {
  delete defaultClient.defaults.headers.common['Authorization'];
}

export async function login(credentials) {
  return await defaultClient.post(endpoint.LOGIN, {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });
}

export async function register(credentials) {
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

export async function updateUser(credentials) {
  return await defaultClient.patch(endpoint.USER, {
    user: {
      email: credentials.email,
      password: credentials.newPassword,
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      date_of_birth: credentials.dateOfBirth,
      current_password: credentials.currentPassword,
    },
  });
}
