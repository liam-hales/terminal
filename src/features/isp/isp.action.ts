import { ComponentProps } from 'react';
import { GroupedListOutput } from '../../components';

/**
 * The ISP feature component props
 */
type Props = ComponentProps<typeof GroupedListOutput>;

/**
 * The action used to execute the logic
 * for the ISP feature command
 *
 * @returns The feature component props
 */
const ispAction = async (): Promise<Props> => {

  // Make a request to the `/meta` endpoint to
  // fetch the users ISP data from CloudFlare
  const response = await fetch('https://speed.cloudflare.com/meta');
  const data = await response.json();

  return {
    spacing: 'medium',
    groups: [
      {
        items: [
          {
            name: 'Name',
            value: data.asOrganization,
          },
          {
            name: 'ASN',
            value: data.asn,
          },
        ],
      },
      {
        items: [
          {
            name: 'City',
            value: data.city,
          },
          {
            name: 'Region',
            value: data.region,
          },
          {
            name: 'Country',
            value: data.country,
          },
          {
            name: 'Postal Code',
            value: data.postalCode,
          },
        ],
      },
      {
        items: [
          {
            name: 'Latitude',
            value: data.latitude,
          },
          {
            name: 'Longitude',
            value: data.longitude,
          },
        ],
      },
    ],
  };
};

export default ispAction;
