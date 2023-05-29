import { Schema } from 'zod';
import { FeatureId, IFeature } from '../types';

/**
 * Used to build the feature from the `config`
 * and allow generic type inference
 *
 * - Generic type `F` for the feature ID
 * - Generic type `S` for the command schema
 * - Generic type `P` for the component props
 *
 * @param config The feature config
 * @returns The feature
 */
const buildFeature = <
  F extends FeatureId,
  S extends Schema,
  P extends Record<keyof P, unknown>,
>(config: IFeature<F, S, P>) => {
  return config;
};

export default buildFeature;
