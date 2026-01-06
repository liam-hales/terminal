import { buildFeature } from '../../helpers';
import { GroupedListOutput } from '../../components';
import { ispAction } from '.';
import { z } from 'zod';

/**
 * The ISP feature, executed with `isp`, used to fetch
 * information about the users ISP (internet service provider)
 */
const ispFeature = buildFeature({
  id: 'isp',
  command: {
    name: 'isp',
    description: 'Used to fetch information about the users ISP (internet service provider)',
    options: z.object({}),
    execution: 'client',
    action: ispAction,
  },
  component: GroupedListOutput,
  isEnabled: true,
});

export default ispFeature;
