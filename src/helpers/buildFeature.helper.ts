import { z, ZodObject, ZodRawShape } from 'zod';
import { FeatureId, IFeature } from '../types';

/**
 * The common options schema used to describe the
 * common command options for all features using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const commonOptions = z.object({
  help: z
    .boolean()
    .optional()
    .default(false)
    .describe('Display help for the command'),
});

/**
 * Used to build the feature from the `config`
 * and allow generic type inference
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the command options
 * - Generic type `P` for the component props
 *
 * @param config The feature config
 * @returns The full feature
 */
const buildFeature = <
  F extends FeatureId,
  O extends ZodObject<ZodRawShape>,
  P extends object,
>(config: IFeature<F, O, P>) => {
  const { command } = config;
  const { options } = command;

  // Return the config with the command
  // options schema merged with the common one
  return {
    ...config,
    command: {
      ...command,
      options: commonOptions.merge(options),
    },
  };
};

export default buildFeature;
