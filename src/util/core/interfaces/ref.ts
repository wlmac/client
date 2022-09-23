import type Client from '../client/client';

export default interface Ref<I, A> {
  value: I;
  deref(client: Client): Promise<A>;
}
