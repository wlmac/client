import { default as axios } from 'axios';
import Routes from '../misc/routes';

export default class SessionManager {
  private refreshToken: string = '';
  private accessToken: string = '';

  auth(token: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.refreshToken = token;
      this.refresh()
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  login(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Routes.AUTH.LOGIN, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.refresh && res.data.access) {
            this.refreshToken = res.data.refresh;
            this.accessToken = res.data.access;
            resolve();
          } else if (res.data.detail) {
            reject('Username or password incorrect');
          } else {
            reject('Missing data from server response');
          }
        })
        .catch((err) => {
          reject('Error in request');
        });
    });
  }

  private refresh(): Promise<void> {
    let tmpRefreshToken = this.refreshToken;
    this.refreshToken = '';
    this.accessToken = '';
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Routes.AUTH.REFRESH, {
          refresh: tmpRefreshToken,
        })
        .then((res) => {
          if (res.data.refresh && res.data.access) {
            this.refreshToken = res.data.refresh;
            this.accessToken = res.data.access;
            resolve();
          } else if (res.data.detail) {
            reject('Invalid request');
          } else {
            reject('Invalid response');
          }
        })
        .catch((err) => {
          reject('Error in request');
        });
    });
  }

  request<T>(
    endpoint: string,
    payload: any,
    method: RequestMethod,
    auth: boolean,
    noRetry?: boolean,
  ): Promise<APIResponse<T>> {
    return new Promise((resolve, reject) => {
      axios[method](
        `${Routes.BASEURL}${endpoint}`,
        payload,
        auth
          ? {
              headers: {
                Bearer: `Authorization ${this.accessToken}`,
              },
            }
          : {},
      )
        .then((res) => {
          resolve(new APIResponse(res.data));
        })
        .catch((err) => {
          if (auth && !noRetry) {
            this.refresh()
              .then(() => {
                return this.request(endpoint, payload, method, auth, true);
              })
              .catch(reject);
          }
          resolve(new APIResponse<T>(null, err));
        });
    });
  }
}

export class APIResponse<T> {
  response: T | null;
  error: string | null;

  constructor(response: T | null, error?: string) {
    this.response = response;
    if (error === undefined) {
      this.error = null;
    } else {
      this.error = error;
    }
  }

  get success() {
    return !this.error;
  }
}

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
}
