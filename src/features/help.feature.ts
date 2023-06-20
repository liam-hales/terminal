import { z } from 'zod';
import { buildFeature } from '../helpers';

/**
 * The help feature, executed with `help`, used to display help for
 * commands and give guidance on their options and how to use them
 */
const helpFeature = buildFeature({
  id: 'help',
  enabled: true,
  component: () => {
    return null;
  },
  command: {
    name: 'help',
    options: {
      schema: z.object({
        for: z.string().optional(),
      }),
      config: {
        for: {
          description: 'The command help is needed for',
        },
      },
    },
    action: () => {
      return {};
    },
  },
});

export default helpFeature;
