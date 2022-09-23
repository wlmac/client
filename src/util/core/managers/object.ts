import GenericManager from './generic';
import { RequestMethod } from './session';
import Routes from '../misc/routes';

export default abstract class ObjectManager<K, V> extends GenericManager<K, V, null> {
  _isExpired(key: K): boolean {
    // TODO: query https://noi.nyiyui.ca/k/1063/4604#Get_Object_Changes
    throw new Error('unimplemented')
  }

  /** Internal method. Convert K to string to use in query. */
  abstract _keyToString(key: K): string;

  _eagerlyGet(key: K): Promise<V> {
    return this.session
      .request<V>(Routes.OBJECT + encodeURI(this._keyToString(key)), undefined, RequestMethod.GET, true, true)
      .then((resp) => {
        if (!resp.success) throw new TypeError(resp.error === null ? '' : resp.error);
        return resp.response as V
      });
  }
  
  // TODO; impl https://noi.nyiyui.ca/k/1063/4604#Get_Objects
  
  // TODO; impl https://noi.nyiyui.ca/k/1063/4604#Edit_Object

  _newExpiry(key: K, value: V): null {
    return null
  }
}

