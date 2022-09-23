import Ref from '../interfaces/ref';
import type Client from '../client/client';
import Organization from '../interfaces/organization';

export default class RefOrganization implements Ref<number, Organization> {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  deref(client: Client): Promise<Organization> {
    throw new TypeError('not implemented');
  }
}
