import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../../components';
import { formatJsonOptions } from '.';

/**
 * The format JSON feature options
 */
type Options = z.infer<typeof formatJsonOptions>;

/**
 * The format JSON feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the format JSON feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const formatJsonAction = async (options: Options): Promise<Props> => {
  const { value } = options;

  // Parse the value and stringify
  // it to format the JSON
  const parsed = JSON.parse(value);
  const formatted = JSON.stringify(parsed, undefined, 2);

  return {
    value: formatted,
  };
};

export default formatJsonAction;
