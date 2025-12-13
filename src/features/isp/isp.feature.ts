import { buildFeature } from '../../helpers';
import { IspFeature } from '../../components';
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
  component: IspFeature,
  isEnabled: true,
});

export default ispFeature;
