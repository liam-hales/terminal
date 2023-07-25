import { FeatureMap } from './types';
import { helpFeature } from './help';

/**
 * Describes all the features
 * as an array
 */
export const features = [
  helpFeature,
];

/**
 * Describes all the features as a map between the
 * feature `id` and the corresponding feature
 */
export const featureMap = features.reduce<FeatureMap>((map, feature) => {
  const { id } = feature;
  return {
    ...map,
    [id]: feature,
  };
}, {} as FeatureMap);

export * from './types';
