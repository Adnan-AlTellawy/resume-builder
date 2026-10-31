export const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || null;
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const updated = { ...user, token };
    localStorage.setItem("user", JSON.stringify(updated));
  } catch {
    localStorage.setItem(
      "user",
      JSON.stringify({ token })
    );
  }
};

export const removeToken = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};
