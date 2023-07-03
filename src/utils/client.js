import axios from "axios";
import config from "./config";

const getAppClient = () => {
  const options = {
    baseURL: config?.apiUrl ?? "",
    timeout: +config?.apiTimeout ?? 0,
    headers: {
      "Accept-Language": "ar",
    },
  };

  return axios.create(options);
};

export default getAppClient;
