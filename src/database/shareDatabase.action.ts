'use server';

import { ShareDatabaseClient } from './';

/**
 * Used to interact with the `ShareDatabaseClient`
 * via a server action.
 *
 * - Generic type `K` for the client function key
 * - Generic type `F` for the client function
 *
 * @param fn The client function
 * @param args The client function args
 *
 * @returns The data returned from the client
 */
const shareDatabase = async <
  K extends keyof ShareDatabaseClient,
  F extends ShareDatabaseClient[K],
>(
  fn: K,
  ...args: Parameters<F>
): Promise<ReturnType<F>> => {

  // Initialise the share database client
  // Call the function on said client
  const client = new ShareDatabaseClient();
  // @ts-expect-error Not sure how to fix the type issue with `...args`
  return (client[fn] as F)(...args) as ReturnType<F>;
};

export default shareDatabase;
