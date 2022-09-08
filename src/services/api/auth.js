import defaultClient from '@/services/api/defaultClient.js';
import endpoint from '@/services/api/endpoint.js';

export function setAuthHeader(authHeader) {
  defaultClient.defaults.headers.common['Authorization'] = authHeader;
}

export function removeAuthHeader() {
  delete defaultClient.defaults.headers.common['Authorization'];
}

export async function login(credentials) {
  const loginResponse = await defaultClient.post(endpoint.LOGIN, {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  return loginResponse;
}

export async function register(credentials) {
  const registerResponse = await defaultClient.post(endpoint.REGISTER, {
    user: {
      email: credentials.email,
      password: credentials.password,
      date_of_birth: '1990-01-01',
    },
  });
  return registerResponse;
}
