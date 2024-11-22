import { ComponentProps } from 'react';
import { z } from 'zod';
import { v1, v4, v6, v7 } from 'uuid';
import { TextOutput } from '../../components';
import { uuidOptions } from '.';

/**
 * The UUID feature options
 */
type Options = z.infer<typeof uuidOptions>;

/**
 * The UUID feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the UUID feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const uuidAction = async (options: Options): Promise<Props> => {
  const { version } = options;

  // Define the version map between the version
  // option and the UUID generator function
  const versionMap: Record<Options['version'], () => string> = {
    1: v1,
    4: v4,
    6: v6,
    7: v7,
  };

  // Generate the UUID using the generator
  // function from the version map
  const uuid = versionMap[version]();
  return {
    value: uuid,
  };
};

export default uuidAction;
