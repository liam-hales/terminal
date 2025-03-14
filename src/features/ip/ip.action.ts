import { ComponentProps } from 'react';
import { z } from 'zod';
import { IpFeature } from '../../components';
import { ipOptions } from '.';

/**
 * The IP feature options
 */
type Options = z.infer<typeof ipOptions>;

/**
 * The IP feature component props
 */
type Props = ComponentProps<typeof IpFeature>;

/**
 * The action used to execute the logic
 * for the IP feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const ipAction = async (options: Options): Promise<Props> => {
  const { version } = options;

  /**
   * Used to resolve the users IP address
   * for a specific IP address version
   *
   * @param version The IP address version to resolve
   * @returns The resolved IP address
   */
  const resolveIp = async (version: 4 | 6): Promise<string | undefined> => {
    // Define the URL map between the IP address
    // version and the URL used to resolve it
    const urlMap: Record<number, string> = {
      4: 'https://api.ipify.org',
      6: 'https://api6.ipify.org',
    };

    try {
      const response = await fetch(urlMap[version]);
      return await response.text();
    }
    // Catch any errors while resolving the
    // IP address and just return
    catch {
      return;
    }
  };

  // If the version option has been set, resolve the users
  // IP address for that specific IP version
  if (version != null) {
    const address = await resolveIp(version);

    // If the address has not been resolved then there was an error, this is most
    // likely because the user does not have an IP for the specified version
    if (address == null) {
      throw new Error(`Cannot resolve IPv${version} address`);
    }

    return {
      data: {
        type: 'single-version',
        address: address,
      },
    };
  }

  // Attempt to resolve the users
  // v4 and v6 IP addresses
  const [v4Address, v6Address] = await Promise.all([
    resolveIp(4),
    resolveIp(6),
  ]);

  return {
    data: {
      type: 'multi-version',
      v4Address: v4Address,
      v6Address: v6Address,
    },
  };
};

export default ipAction;
