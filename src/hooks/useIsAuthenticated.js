/* eslint-disable camelcase */
import { useSelector } from "react-redux";

const useIsAuthenticated = () => {
  const { access_token, appEmail } = useSelector((state) => state.authentication);

  return !!access_token || !!appEmail;
};

export default useIsAuthenticated;
