import Ref from '../interfaces/ref';
import type Client from '../client/client';
import Tag from '../interfaces/tag';

export default class RefTag implements Ref<number, Tag> {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  deref(client: Client): Promise<Tag> {
    throw new TypeError('not implemented');
  }
}
