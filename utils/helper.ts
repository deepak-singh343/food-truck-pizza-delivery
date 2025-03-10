import axios from "axios";

export const getUserData = async () => {
  try {
    const response = await axios.get("/api/getUser");
    return response;
  } catch (error: any) {
    return {
      status: error?.status || 500,
      data: null,
    };
  }
};

export const getMenuData = async () => {
  const response = await axios.get("/api/menu");
  return response;
};
