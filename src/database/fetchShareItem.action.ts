'use server';

import { ShareItem } from '../types';
import { ShareDatabaseClient } from './';

/**
 * Used to fetch a share item
 * from DynamoDB via its ID
 *
 * @param id The share item ID
 * @returns The share item
 */
const fetchShareItem = async (id: string): Promise<ShareItem | undefined> => {
  const client = new ShareDatabaseClient();

  // Get the share item from the
  // database using the client
  return await client.get(id);
};

export default fetchShareItem;
