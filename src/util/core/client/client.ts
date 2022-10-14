import { default as axios } from 'axios';
import Routes from '../misc/routes';
import SessionManager, { RequestMethod, APIResponse } from '../managers/session';
import User from '../interfaces/user';
import Ref from '../interfaces/ref';

export default class Client {
  private session: SessionManager = new SessionManager();
  constructor() {}

  auth(token: string): Promise<void> {
    return this.session.auth(token);
  }

  login(username: string, password: string): Promise<void> {
    return this.session.login(username, password);
  }
}
