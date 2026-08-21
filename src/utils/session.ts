export const getCurrentUserName = (): string => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).userName ?? '' : '';
  } catch {
    return '';
  }
};
