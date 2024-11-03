import api from "./axiosConfig";

const CheckToken = async () => {
  try {
    const response = await api.get("api/v1/auth/token");
    return response.data.message ? true : false;
  } catch (error) {
    return false;
  }
};

export default CheckToken;
