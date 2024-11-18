'use server';

import { ComponentProps } from 'react';
import { z } from 'zod';
import { MacLookupFeature } from '../../components';
import { macLookupOptions } from '.';

/**
 * The MAC address lookup
 * feature options
 */
type Options = z.infer<typeof macLookupOptions>;

/**
 * The MAC address lookup feature
 * component props
 */
type Props = ComponentProps<typeof MacLookupFeature>;

/**
 * The action used to execute the logic
 * for the MAC address lookup feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const macLookupAction = async (options: Options): Promise<Props> => {
  const { address } = options;

  // Lookup the vendor/manufacturer
  // for the give MAC address
  const response = await fetch(`https://www.macvendorlookup.com/api/v2/${address}`);
  const { status } = response;

  // If the status is `204`, there is no content and therefore no
  // vendor/manufacturer was found for the given MAC address
  if (status === 204) {
    throw new Error('Cannot find vendor/manufacturer for MAC address');
  }

  // Parse the response JSON, extract the
  // data and return the component props
  const [{
    type,
    startHex,
    endHex,
    company,
    addressL1,
    addressL2,
    addressL3,
    country,
  }] = await response.json();

  return {
    type: type,
    startHex: startHex,
    endHex: endHex,
    company: company,
    address: {
      ...(addressL1 !== '') && {
        lineOne: addressL1,
      },
      ...(addressL2 !== '') && {
        lineTwo: addressL2,
      },
      ...(addressL3 !== '') && {
        lineTwo: addressL3,
      },
      country: country,
    },
  };
};

export default macLookupAction;
