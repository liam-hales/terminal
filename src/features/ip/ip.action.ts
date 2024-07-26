import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../components';
import { ipOptions } from '.';

/**
 * The IP feature options
 */
type Options = z.infer<typeof ipOptions>;

/**
 * The IP feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the IP feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const ipAction = async (options: Options): Promise<Props> => {
  const { version } = options;

  const url = (version === 4)
    ? 'https://api.ipify.org'
    : 'https://api6.ipify.org';

  try {
    const response = await fetch(url);
    const ipAddress = await response.text();

    return {
      value: ipAddress,
    };
  }
  catch {
    // There was an error resolving the IP address, this is most likely because
    // the user does not have an IP for the specified version
    throw new Error(`Cannot resolve IPv${version} address`);
  }
};

export default ipAction;
