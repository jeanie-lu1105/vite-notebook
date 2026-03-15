import axios from "axios";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export function request(url: string, method: string = "GET", data?: {}) {
  return new Promise((resolve: any, reject: any) => {
    let option: any = {
      url,
      method,
      validateStatus(status: number) {
        return status >= 200 && status < 500;
      },
    };
    if (method.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option)
      .then((res) => {
        if (res.status !== 200) {
          console.log("res != 200");
          reject(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
