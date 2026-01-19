import { ZodObject } from 'zod';
import { FeatureId, FeatureType, SystemFeature, ClientFeature, ServerFeature } from '../types';
import { commonOptions } from '../features/common';
import { FunctionComponent } from 'react';

/**
 * Used to build a feature from the `config`
 * and allow generic type inference
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the options schema
 * - Generic type `P` for the component props
 * - Generic type `C` for the component
 *
 * @param type The feature type
 * @param config The feature config
 *
 * @returns The feature
 */
const buildFeature = <
  T extends FeatureType,
  F extends FeatureId,
  O extends ZodObject,
  P extends object,
  C extends FunctionComponent<never> | undefined = undefined,
>(
  type: T,
  config: T extends 'system'
    ? Omit<SystemFeature<F, O, C>, 'type'>
    : Omit<ClientFeature<F, O, P> | ServerFeature<F, O, P>, 'type'>,
) => {
  const { options } = config;

  // Return the config with the options
  // schema merged with the common one
  return {
    ...config,
    type: type,
    // Using `.merge` is still required as the types
    // when using `.extends` does not work the same
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    options: commonOptions.merge(options),
  } as const;
};

export default buildFeature;
