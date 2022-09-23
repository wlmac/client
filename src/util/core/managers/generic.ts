import SessionManager, { RequestMethod } from './session';

export default abstract class GenericManager<K, V, E> {
  protected session;
  protected cache = new Map<K, { v: V, expiry: E }>();

  constructor(session: SessionManager) {
    this.session = session;
  }

  async get(key: K): Promise<V> {
    const cachedUser = this.cache.get(key);
    if (cachedUser !== undefined) {
      const expire = new Date()
      expire.setHours(expire.getHours() + 24);
      if (!this._isExpired(key)) {
        return cachedUser.v;
      }
    }
    const v = await this._eagerlyGet(key)
    this.cache.set(key, { v, expiry: this._newExpiry(key, v) })
    return v
  }

  /** Internal method. Checks if a cached value is expired. */
  abstract _isExpired(key: K): boolean;

  /** Internal method. Generates expiry for to-be-cached value. */
  abstract _newExpiry(key: K, value: V): E;

  /** Internal method. Eagerly get the value. */
  abstract _eagerlyGet(key: K): Promise<V>;
}
