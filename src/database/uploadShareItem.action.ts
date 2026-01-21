'use server';

import { ShareItem } from '../types';
import { ShareDatabaseClient } from './';

/**
 * Used to upload share data and insert
 * a new share item into DynamoDB
 *
 * @param payload The share item payload
 * @returns The created share item
 */
const uploadShareItem = async (payload: Omit<ShareItem, 'id'>): Promise<ShareItem> => {
  const client = new ShareDatabaseClient();

  // Insert a new record into the share
  // database using the client
  return await client.insert(payload);
};

export default uploadShareItem;
