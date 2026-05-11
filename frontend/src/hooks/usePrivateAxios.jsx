import useAuth from "./useAuth";
import useRefresh from "./useRefresh";
import { privateAxios } from "../api/axios";
import { useEffect } from "react";

const usePrivateAxios = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prvRequest = error?.config;
        if (error?.response?.status === 403 && !prvRequest?.sent) {
          prvRequest.sent = true;
          const newAccessToken = await refresh();
          prvRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(prvRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      privateAxios.interceptors.response.eject(responseIntercept);
      privateAxios.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return privateAxios;
};

export default usePrivateAxios;
