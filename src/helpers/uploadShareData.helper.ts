/* eslint-disable @typescript-eslint/naming-convention */

'use server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { nanoid } from 'nanoid';
import { ShareItem } from '../types';

/**
 * Used to upload share data to
 * a new DynamoDB record
 *
 * @param payload The item payload
 * @returns The share ID
 */
const uploadShareData = async (payload: Omit<ShareItem, 'id'>): Promise<string> => {

  // Extract the DynamoDB environment variables
  // and make sure they have been set
  const region = process.env.DYNAMO_DB_REGION;
  const tableName = process.env.DYNAMO_DB_SHARED_BLOCKS_TABLE_NAME;

  if (region == null) {
    throw new Error('The "DYNAMO_DB_REGION" environment variable is required');
  }

  if (tableName == null) {
    throw new Error('The "DYNAMO_DB_SHARED_BLOCKS_TABLE_NAME" environment variable is required');
  }

  // Initialise the new document client
  // using the DynamoDb client
  const client = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: region,
    }),
  );

  // Create the new put command for
  // inserting a record into the table
  const id = nanoid(8);
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      ...payload,
      id: id,
    },
  });

  // Send the command to insert the
  // record into the database table
  await client.send(command);

  return id;
};

export default uploadShareData;
