const BASEURL = "https://maclyonsden.com";
// const BASEURL = "http://localhost:8000";

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
