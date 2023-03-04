// @ts-ignore
//const BASEURL = import.meta.env.DEV ? "http://localhost:8000" : "https://auth.jimmyliu.dev";
const BASEURL = "https://auth.jimmyliu.dev";

const Routes = {
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/auth/token`,
    REFRESH: `${BASEURL}/api/auth/token/refresh`,
  },
  POST: {
    USER: `${BASEURL}/api/v3/user`,
    ANNOUNCEMENT: `${BASEURL}/api/v3/announcement`,
  },
  USER: `${BASEURL}/api/v3/user`,
  OBJECT: `${BASEURL}/api/v3/obj`,
};

export default Routes;
