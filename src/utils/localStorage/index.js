export const getAccessToken = () => {
  return localStorage.getItem("accessToken");

} 
export const setAccessToken = (value) => {
  localStorage.setItem("accessToken", value);
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const isAuthenticated = () => {
  return getAccessToken
};
