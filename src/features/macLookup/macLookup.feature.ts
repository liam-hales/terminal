import { buildFeature } from '../../helpers';
import { MacLookupFeature } from '../../components';
import { macLookupOptions, macLookupAction } from '.';

/**
 * The MAC address lookup feature, executed with `maclookup`, Used to lookup the
 * vendor/manufacturer for a given MAC address using the `maclookup.com` API under the hood
 */
const macLookupFeature = buildFeature({
  id: 'mac-lookup',
  command: {
    name: 'maclookup',
    description: 'Used to lookup the vendor/manufacturer for a given MAC address',
    options: macLookupOptions,
    action: macLookupAction,
  },
  component: MacLookupFeature,
  enabled: true,
});

export default macLookupFeature;
