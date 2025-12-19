import { FeatureMap } from './types';
import { helpFeature } from './help';
import { encodeFeature } from './encode';
import { ipFeature } from './ip';
import { jwtFeature } from './jwt';
import { whoisFeature } from './whois';
import { datetimeFeature } from './datetime';
import { keyPairFeature } from './keyPair';
import { passGenFeature } from './passGen';
import { uuidFeature } from './uuid';
import { macLookupFeature } from './macLookup';
import { fileUploadfeature } from './fileUpload';
import { ispFeature } from './isp';
import { speedTestFeature } from './speedTest';
import { formatJsonFeature } from './format/json';
import { formatSqlFeature } from './format/sql';

/**
 * Describes all the features
 * as an array
 */
export const features = [
  helpFeature,
  encodeFeature,
  ipFeature,
  jwtFeature,
  whoisFeature,
  datetimeFeature,
  keyPairFeature,
  passGenFeature,
  uuidFeature,
  macLookupFeature,
  fileUploadfeature,
  ispFeature,
  speedTestFeature,
  formatJsonFeature,
  formatSqlFeature,
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
