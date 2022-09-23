import GenericManager from './generic';

export default abstract class TimedManager<K, V> extends GenericManager<K, V, Date> {
  /**
   * Internal method. Get expiry time. Must have no side effects except being
   * non-deterministic due to relying on the current time.
   */
  abstract _expiryTime(): Date;

  _isExpired(key: K): boolean {
    return (this.cache.get(key) as { v: V, expiry: Date }).expiry <= this._expiryTime()
  }

  _newExpiry(key: K, value: V): Date {
    return new Date()
  }
}
