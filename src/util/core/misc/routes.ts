const Routes = {
  BASEURL: 'https://maclyonsden.com',
  AUTH: {
    LOGIN: 'http://localhost:3000/api/auth/token', //'https://maclyonsden.com/api/auth/token',
    REFRESH: 'https://maclyonsden.com/api/auth/token/refresh',
  },
  POST: {
	USER: 'http://maclyonsden.com/api/v3/user',
    ANNOUNCEMENT: 'https://maclyonsden.com/api/v3/announcement',
  },
  USER: 'https://maclyonsden.com/api/v3/user/',
  OBJECT: "https://maclyonsden.com/api/v3/",
};

export default Routes;
