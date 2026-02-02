/* eslint-disable @typescript-eslint/naming-convention */

'use server';

import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ShareItem } from '../types';
import { nanoid } from 'nanoid';

/**
 * The database client used to interact with
 * share items stored in DynamoDB
 */
class ShareDatabaseClient {

  private readonly _client: DynamoDBDocumentClient;
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

    // Initialise the `DynamoDBDocumentClient` client
    // using the DynamoDB client
    this._client = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: region,
      }),
    );

    this._region = region;
    this._tableName = tableName;
  }

  /**
   * Used to fetch a share
   * item via its ID
   *
   * @param id The share item ID
   * @returns The share item
   */
  public async get(id: string): Promise<ShareItem | undefined> {

    // Create the new get command for fetching
    // a record from the table via its ID
    const command = new GetCommand({
      TableName: this._tableName,
      Key: {
        id: id,
      },
    });

    // Send the command to fetch the
    // record from the database table
    const { Item } = await this._client.send(command);
    return Item as ShareItem;
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
    await this._client.send(command);

    return item;
  }

  /**
   * Used to delete a share
   * item via its ID
   *
   * @param id The share item ID
   */
  public async delete(id: string): Promise<void> {

    // Create the new delete command for deleting
    // a record from the database table
    const command = new DeleteCommand({
      TableName: this._tableName,
      Key: {
        id: id,
      },
    });

    await this._client.send(command);
  }
}

export default ShareDatabaseClient;
