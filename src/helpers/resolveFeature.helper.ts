import { search } from 'fast-fuzzy';
import { ValidationException } from '../exceptions';
import { ParsedInput } from '../types';
import { Feature, features } from '../features';

/**
 * Used to resolve a feature
 * from a given parsed input
 *
 * @param input The parsed input
 * @returns The resolved feature
 */
const resolveFeature = (input: ParsedInput): Feature => {
  const { command: inputCommand } = input;

  if (inputCommand == null) {
    throw new Error('No command input');
  }

  // Attempt to find a feature with a command
  // name that matches the input command
  const feature = features.find((feature) => {
    const { command } = feature;
    const { name } = command;

    return name === inputCommand;
  });

  // If a feature cannot be found for the command,
  // then throw a validation exception
  if (feature == null) {

    // Attempt to search for features that are
    // a close match to the input command
    const names = features.map((feature) => feature.command.name);
    const matches = search(inputCommand, names);

    throw new ValidationException(input, [
      {
        match: inputCommand,

        // If there are matches then use
        // them to build the message
        message: (matches.length > 0)
          ? `Command not found, did you mean ${matches.map((match) => `"${match}"`).join(' or ')}?`
          : 'Command not found, use "help" to list available commands',
      },
    ]);
  }

  const { isEnabled } = feature;

  // If the feature has not been
  // enabled, then throw an error
  if (isEnabled === false) {
    throw new ValidationException(input, [
      {
        match: inputCommand,
        message: 'This feature has been disabled',
      },
    ]);
  }

  return feature;
};

export default resolveFeature;
