import { ZodBoolean, ZodLiteral, ZodNumber, ZodString, ZodTypeAny, ZodUnion } from 'zod';

/**
 * Fully unwraps a given Zod `type`
 *
 * @param type The type to unwrap
 * @returns The unwrapped type
 */
const unwrapType = (type: ZodTypeAny): ZodString | ZodNumber | ZodBoolean | ZodUnion<[ZodString | ZodNumber | ZodLiteral<string> | ZodLiteral<number>]> => {

  // If the type definition contains an `innerType` then call the
  // `unwrapType` function until the zod type has been fully unwrapped
  if ('innerType' in type._def) {
    return unwrapType(type._def.innerType as ZodTypeAny);
  }

  // The type must be full unwrapped
  // if no `innerType` exists
  return type;
};

export default unwrapType;
