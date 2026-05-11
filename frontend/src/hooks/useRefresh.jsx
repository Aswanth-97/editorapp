import React from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/refresh",{},{ withCredentials: true });

    setAuth(prv=>{
      return {...prv,accessToken:response?.data.accessToken}
    })

    console.log(response?.data.accessToken);

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefresh;
