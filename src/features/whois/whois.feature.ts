import { buildFeature } from '../../helpers';
import { GroupedListOutput } from '../../components';
import { whoisOptions, whoisAction } from '.';

/**
 * The Whois feature, executed with `whois`, Used to perform a whois search on domain names
 * and IP addresses to obtain owner information using the `whoiser` package under the hood
 */
const whoisFeature = buildFeature('managed', {
  id: 'whois',
  command: 'whois',
  description: 'Used to perform a whois search on domain names and IP addresses to obtain owner information',
  options: whoisOptions,
  execution: 'server',
  action: whoisAction,
  component: GroupedListOutput,
  isEnabled: true,
});

export default whoisFeature;
