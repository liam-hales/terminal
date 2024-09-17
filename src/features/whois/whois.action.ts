'use server';

import { ComponentProps } from 'react';
import { z } from 'zod';
import whoiser from 'whoiser';
import { WhoisFeature } from '../../components';
import { WhoisData } from '../../components/types';
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
  const { search, server, follow } = options;

  // Make a call to `whoiser` to perform a whois
  // search using the command options
  const data = await whoiser(search, {
    host: server,
    follow: follow + 1,
    ignorePrivacy: true,
  // This type casting is more accurate to what
  // is actually returned from `whoiser`
  }) as WhoisData;

  return {
    data: data,
  };
};

export default whoisAction;
