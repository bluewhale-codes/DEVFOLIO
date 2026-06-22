/**
 * Auth Utility Functions
 * Handles localStorage operations and auth state checks
 */

export const saveAuthData = (data) => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getToken = () => {
  return localStorage.getItem('access_token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};