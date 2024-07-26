import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../components';
import { base64Options } from '.';

/**
 * The Base64 feature options
 */
type Options = z.infer<typeof base64Options>;

/**
 * The Base64 feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the Base64 feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const base64Action = (options: Options): Props => {
  const { value, decode } = options;

  const fromEncoding = (decode === true) ? 'base64' : 'utf-8';
  const toEncoding = (decode === true) ? 'utf8' : 'base64';

  const output = Buffer
    .from(value, fromEncoding)
    .toString(toEncoding);

  return {
    value: output,
  };
};

export default base64Action;
