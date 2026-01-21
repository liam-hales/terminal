/* eslint-disable @typescript-eslint/naming-convention */

'use server';

import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ShareItem } from '../types';
import { nanoid } from 'nanoid';

/**
 * The database client used to interact with
 * share items stored in DynamoDB
 */
class ShareDatabaseClient extends DynamoDBDocumentClient {

  private readonly _client: DynamoDBClient;
  private readonly _region: string;
  private readonly _tableName: string;

  /**
   * Constructs a new `ShareDatabaseClient`
   */
  public constructor() {

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

    // Initialise the underlying
    // DynamoDB client
    const client = new DynamoDBClient({
      region: region,
    });

    // Call super with the underlying DynamoDB client
    // to initialise the `DynamoDBDocumentClient`
    super(client);

    this._client = client;
    this._region = region;
    this._tableName = tableName;
  }

  /**
   * Used to insert a new
   * share item record
   *
   * @param payload The share item payload
   * @returns The created share item
   */
  public async insert(payload: Omit<ShareItem, 'id'>): Promise<ShareItem> {

    // Create the new share
    // item to insert
    const id = nanoid(8);
    const item: ShareItem = {
      ...payload,
      id: id,
    };

    // Create the new put command for
    // inserting a record into the table
    const command = new PutCommand({
      TableName: this._tableName,
      Item: item,
    });

    // Send the command to insert the
    // record into the database table
    await this.send(command);

    return item;
  }
}

export default ShareDatabaseClient;
