/**
 * Used to extract the keys from a given object which is also typesafe
 * returning keys with a type of `(keyof T)` instead of `string[]`
 *
 * @param from The object to extract keys from
 * @returns The objects keys
 */
const extractKeys = <T extends Record<keyof T, unknown>>(from: T): (keyof T)[] => {
  return Object.keys(from) as (keyof T)[];
};

export default extractKeys;
