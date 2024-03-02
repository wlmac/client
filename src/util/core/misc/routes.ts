// @ts-ignore
// const BASEURL = import.meta.env.DEV ? "https://auth.jimmyliu.dev" : "https://maclyonsden.com";
// const BASEURL = "https://auth.jimmyliu.dev";
const BASEURL = "https://maclyonsden.com";

const APIURL = `${BASEURL}/api`
const API3URL = `${APIURL}/v3`
const Routes = {
  BASEURL: BASEURL,
  OBJECT: `${BASEURL}/api/v3/obj`,
  AUTH: {
    LOGIN: `${APIURL}/auth/token`,
    REFRESH: `${APIURL}/auth/token/refresh`,
  },
  POST: {
    USER: `${API3URL}/obj/user/retrieve`,
    USER_UPDATE: `${API3URL}/obj/user/single`,
    ANNOUNCEMENT: `${API3URL}/announcement`,
  },
  USER: `${API3URL}/obj/user`,
  PERSONAL_TIMETABLE: `${APIURL}/me/timetable`,
  TIMETABLE: `${API3URL}/obj/timetable`,
  SCHEDULE: {
    LOGGED_IN: `${APIURL}/me/schedule`,
    NOT_LOGGED_IN: `${APIURL}/term/current/schedule`,
  },
  COURSE: `${API3URL}/obj/course`,
  STAFF: `${API3URL}/staff`
};

export default Routes;
