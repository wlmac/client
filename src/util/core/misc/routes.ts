// @ts-ignore
// const BASEURL = import.meta.env.DEV ? "https://auth.jimmyliu.dev" : "https://maclyonsden.com";
// const BASEURL = "https://auth.jimmyliu.dev";
const BASEURL = "https://maclyonsden.com";

const Routes = {
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/auth/token`,
    REFRESH: `${BASEURL}/api/auth/token/refresh`,
  },
  POST: {
    USER: `${BASEURL}/api/v3/obj/user/retrieve`,
    USER_UPDATE: `${BASEURL}/api/v3/obj/user/single`,
    ANNOUNCEMENT: `${BASEURL}/api/v3/announcement`,
  },
  USER: `${BASEURL}/api/v3/obj/user`,
  TIMETABLE: `${BASEURL}/api/me/timetable`,
  SCHEDULE: `${BASEURL}/api/me/schedule`,
  COURSE: `${BASEURL}/api/v3/obj/course`,
  OBJECT: `${BASEURL}/api/v3/obj`,
};

export default Routes;
