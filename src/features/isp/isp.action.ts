import { ComponentProps } from 'react';
import { IspFeature } from '../../components';

/**
 * The ISP feature component props
 */
type Props = ComponentProps<typeof IspFeature>;

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
    name: data.asOrganization,
    asn: data.asn,
    city: data.city,
    region: data.region,
    country: data.country,
    postCode: data.postalCode,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};

export default ispAction;
