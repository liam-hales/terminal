import { features } from '.';
import { Map } from '../types';

/**
 * Used to describe all features
 */
export type Feature = typeof features[number];

/**
 * Used to describe the map between the
 * feature `id` and the corresponding feature
 */
export type FeatureMap = Map<Feature, 'id'>;

/**
 * Used to describe the map between the feature `id`
 * and the corresponding system feature
 */
export type SystemFeatureMap = Map<Extract<Feature, { readonly type: 'system'; }>, 'id'>;

/**
 * Used to describe the map between the feature `id`
 * and the corresponding managed feature
 */
export type ManagedFeatureMap = Map<Extract<Feature, { readonly type: 'managed'; }>, 'id'>;
