import { useEffect, useState } from "react";
import api from "./axiosConfig";

const CheckToken = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await api.get("api/v1/auth/token");
        if (response.data.message) setIsValid(true);
        else setIsValid(false);
      } catch (error) {
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  return isValid;
};

export default CheckToken;
