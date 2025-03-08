import axios from "axios";

export const getUserData = async () => {
  const response = await axios.get("/api/profile");
  return response;
};

export const getMenuData = async () => {
  const response = await axios.get("/api/menu");
  return response;
};
