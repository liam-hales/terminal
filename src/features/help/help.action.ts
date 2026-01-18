import { ComponentProps } from 'react';
import { z } from 'zod';
import { HelpFeature } from '../../components';
import { features } from '..';
import { helpOptions } from '.';

/**
 * The help feature options
 */
type Options = z.infer<typeof helpOptions>;

/**
 * The help feature component props
 */
type Props = ComponentProps<typeof HelpFeature>;

/**
 * The action used to execute the logic
 * for the help feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const helpAction = (options: Options): Props => {
  const { for: commandName } = options;

  // If there is no `for` option
  // then return no props
  if (commandName == null) {
    return {};
  }

  // Attempt to find a feature with a command
  // that matches the `for` option
  const feature = features.find((feature) => feature.command === commandName);

  // If a feature cannot be found for the
  // command, then throw an error
  if (feature == null) {
    throw new Error(`Command "${commandName}" not found`);
  }

  return {
    featureId: feature.id,
  };
};

export default helpAction;
