import { ZodBoolean, ZodLiteral, ZodNumber, ZodString, ZodType, ZodUnion } from 'zod';

/**
 * Used to alias all the possible `zod`
 * strict types that may need to be unwrapped
 */
type ZodStrictType =
  | ZodString
  | ZodNumber
  | ZodBoolean
  | ZodUnion<[ZodString | ZodNumber | ZodLiteral<string> | ZodLiteral<number>]>;

/**
 * Fully unwraps a given Zod `type`
 *
 * @param type The type to unwrap
 * @returns The unwrapped type
 */
const unwrapType = (type: ZodType): ZodStrictType => {

  // If the type definition contains an `innerType` then call the
  // `unwrapType` function until the zod type has been fully unwrapped
  if ('innerType' in type.def) {
    return unwrapType(type.def.innerType as ZodType);
  }

  // The type must be full unwrapped
  // if no `innerType` exists
  return type as ZodStrictType;
};

export default unwrapType;
