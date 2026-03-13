import { request } from "@/helpers/request";

const URL = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  GET_INFO: "/auth",
};

export const Auth = {
  register(username: string, password: string) {
    return request(URL.REGISTER, "POST", {
      username,
      password,
    });
  },
  login(username: string, password: string) {
    return request(URL.LOGIN, "POST", {
      username,
      password,
    });
  },
  logout() {
    return request(URL.LOGOUT, "POST");
  },
  getInfo() {
    return request(URL.GET_INFO);
  },
};
