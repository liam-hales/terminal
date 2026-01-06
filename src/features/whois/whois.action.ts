'use server';

import { ComponentProps } from 'react';
import { z } from 'zod';
import whoiser from 'whoiser';
import { GroupedListOutput } from '../../components';
import { ListOutputGroup, ListOutputItem, WhoiserData } from '../../components/types';
import { whoisOptions } from '.';

/**
 * The Whois feature options
 */
type Options = z.infer<typeof whoisOptions>;

/**
 * The Whois feature component props
 */
type Props = ComponentProps<typeof GroupedListOutput>;

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

  // Map the data into an array of
  // groups for the component props
  const groups = Object
    .keys(data)
    .map<ListOutputGroup>((key) => {

      // Extract the item from the data using its key
      // and reduce the item to correctly map it
      const item = data[key];
      return {
        items: [
          {
            name: 'Server',
            value: key,
          },
          ...Object
            .keys(item)
            .map<ListOutputItem>((key) => {

              // Extract and format the value from the
              // data as it could be an array
              const value = item[key];
              const formatted = (typeof value === 'string')
                ? value
                : value.join('\n');

              return {
                name: key,
                value: (formatted !== '') ? formatted : 'REDACTED',
              };
            })
            .filter((item) => {
              const { value } = item;

              // Remove `REDACTED` values if the `excludeRedacted`
              // command option has been set
              if (value === 'REDACTED' && excludeRedacted === true) {
                return false;
              }

              return true;
            }),
        ],
      };
    });

  return {
    spacing: 'large',
    groups: groups,
  };
};

export default whoisAction;
