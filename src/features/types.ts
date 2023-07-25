import { features } from '.';

/**
 * The feature type used to
 * describe all features
 */
export type Feature = typeof features[number];

/**
 * The feature map between the feature `id`
 * and the corresponding feature
 */
export type FeatureMap = {
  [K in Feature['id']]: Extract<
    Feature,
    {
      readonly id: K;
    }
  >;
};
