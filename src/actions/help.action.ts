import { ComponentProps } from 'react';
import { z } from 'zod';
import { HelpFeature } from '../components';
import { helpOptionsSchema } from '../schemas';
import features from '../features';

/**
 * The help feature options
 */
type Options = z.infer<typeof helpOptionsSchema>;

/**
 * The help feature component props
 */
type Props = ComponentProps<typeof HelpFeature>;

/**
 * The help used to execute the logic
 * for the help feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const helpAction = (options: Options): Props | undefined => {
  const { for: commandName } = options;

  // If there is no `for` option
  // then return no props
  if (commandName == null) {
    return;
  }

  // Attempt to find a feature with a command
  // name that matches the `for` option
  const feature = features.find((feature) => {
    const { command } = feature;
    const { name } = command;

    return name === commandName;
  });

  // If a feature cannot be found for the
  // command, then throw an error
  if (feature == null) {
    throw new Error(`Command "${commandName}" not found`);
  }

  return {
    command: feature.command,
  };
};

export default helpAction;
