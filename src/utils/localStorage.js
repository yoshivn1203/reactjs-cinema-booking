export const addUserToLocalStorage = (user) => {
  localStorage.setItem('USER_CINEMA', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('USER_CINEMA');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('USER_CINEMA');
  const user = result ? JSON.parse(result) : null;
  return user;
};
