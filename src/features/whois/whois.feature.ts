import { buildFeature } from '../../helpers';
import { WhoisFeature } from '../../components';
import { whoisOptions, whoisAction } from '.';

/**
 * The Whois feature, executed with `whois`, Used to perform a whois search on domain names
 * and IP addresses to obtain owner information using the `whoiser` package under the hood
 */
const whoisFeature = buildFeature({
  id: 'whois',
  command: {
    name: 'whois',
    description: 'Used to perform a whois search on domain names and IP addresses to obtain owner information',
    options: whoisOptions,
    action: whoisAction,
  },
  component: WhoisFeature,
  enabled: true,
});

export default whoisFeature;
