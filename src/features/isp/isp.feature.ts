import { buildFeature } from '../../helpers';
import { GroupedListOutput } from '../../components';
import { ispAction } from '.';
import { z } from 'zod';

/**
 * The ISP feature, executed with `isp`, used to fetch
 * information about the users ISP (internet service provider)
 */
const ispFeature = buildFeature('managed', {
  id: 'isp',
  command: 'isp',
  description: 'Used to fetch information about the users ISP (internet service provider)',
  options: {
    schema: z.object({}),
    aliases: {},
  },
  execution: 'client',
  action: ispAction,
  component: GroupedListOutput,
  isEnabled: true,
});

export default ispFeature;
