import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../components';
import { encodeOptions } from '.';

/**
 * The encode feature options
 */
type Options = z.infer<typeof encodeOptions>;

/**
 * The encode feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the encode feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const encodeAction = (options: Options): Props => {
  const { value, from, to } = options;

  const output = Buffer
    .from(value, from)
    .toString(to);

  return {
    value: output,
  };
};

export default encodeAction;
