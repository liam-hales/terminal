'use server';

import { ComponentProps } from 'react';
import { z } from 'zod';
import whoiser from 'whoiser';
import { WhoisFeature } from '../../components';
import { WhoiserData, WhoisResult } from '../../components/types';
import { whoisOptions } from '.';

/**
 * The Whois feature options
 */
type Options = z.infer<typeof whoisOptions>;

/**
 * The Whois feature component props
 */
type Props = ComponentProps<typeof WhoisFeature>;

/**
 * The action used to execute the logic
 * for the Whois feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const whoisAction = async (options: Options): Promise<Props> => {
  const { search, server, follow, excludeRedacted } = options;

  // Make a call to `whoiser` to perform a whois
  // search using the command options
  const data = await whoiser(search, {
    host: server,
    follow: follow + 1,
    ignorePrivacy: true,
  // This type casting is more accurate to what
  // is actually returned from `whoiser`
  }) as WhoiserData;

  // Map the data into results for
  // the feature component props
  const results: WhoisResult[] = Object
    .keys(data)
    .map((key) => {

      // Extract the item from the data using it's key
      // and reduce the item to correctly map it
      const item = data[key];
      return {
        serverName: key,
        data: Object
          .keys(item)
          .reduce((map, key) => {

            // Remove any empty strings from the data or set their value
            // to `REDACTED` depending on the command options set
            const value = item[key];
            return {
              ...map,
              ...(value !== '') && {
                [key]: value,
              },
              ...(value === '' && excludeRedacted === false) && {
                [key]: 'REDACTED',
              },
            };
          }, {}),
      };
    });

  return {
    results: results,
  };
};

export default whoisAction;
