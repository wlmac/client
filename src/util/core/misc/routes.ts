// @ts-ignore
const BASEURL = "https://maclyonsden.com";

const Routes = {
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/auth/token`,
    REFRESH: `${BASEURL}/api/auth/token/refresh`,
  },
  POST: {
    USER: `${BASEURL}/api/v3/obj/user/retrieve`,
    ANNOUNCEMENT: `${BASEURL}/api/v3/announcement`,
  },
  USER: `${BASEURL}/api/v3/obj/user/retrieve`,
  TIMETABLE: `${BASEURL}/api/me/timetable`,
  OBJECT: `${BASEURL}/api/v3/obj`,
};

export default Routes;
