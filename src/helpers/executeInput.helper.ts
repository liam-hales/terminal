import { paramCase } from 'param-case';
import features, { Feature } from '../features';
import { FeatureOutput, ParsedInput } from '../types';
import { extractKeys } from '.';

/**
 * Used to execute a given parsed `input` that
 * has been parsed using `parseInput`
 *
 * - Checks if a feature exists for the `input.command`
 * - Validates the `input.options` against the options schema
 * - Executes the feature command action
 *
 * @param input The parsed input
 * @returns The feature output
 */
const executeInput = (input: ParsedInput): FeatureOutput<Feature> => {
  const {
    command: inputCommand,
    options: inputOptions = {},
  } = input;

  if (inputCommand == null) {
    throw new Error('No command input');
  }

  // Attempt to find a feature with a command
  // that matches the input command
  const feature = features.find((feature) => {
    const { name } = feature.command;
    return name === inputCommand;
  });

  // If a feature cannot be found for the
  // command, then throw an error
  if (feature == null) {
    throw new Error(`Command "${inputCommand}" not found`);
  }

  const { id, command, enabled } = feature;
  const { name, options, action } = command;
  const { schema } = options;

  // If the feature has not been
  // enabled, then throw an error
  if (enabled === false) {
    throw new Error(`Feature "${name}" has been disabled`);
  }

  const validated = schema
    .strict()
    .safeParse(inputOptions);

  // Check if the validation failed, if so map the errors
  // into an a single message and throw an error
  if (validated.success === false) {
    const { error } = validated;
    const { issues } = error;

    // Check to see if there is an `unrecognized_keys` error and
    // if so throw an unknown options error
    issues.forEach((issue) => {
      if (issue.code === 'unrecognized_keys') {
        const { keys } = issue;

        const plural = (keys.length > 1) ? 's' : '';
        const optons = keys
          .map((key) => `"--${paramCase(key)}"`)
          .join(', ');

        throw new Error(`Unknown option${plural}: ${optons}`);
      }
    });

    const { fieldErrors } = error.flatten();

    // Map the validation errors into suitable messages and join
    // them together for the error that will be thrown
    const message = extractKeys(fieldErrors)
      .map((key) => {
        const messages = fieldErrors[key] ?? [];
        const isRequired = messages.includes('Required');

        // If the messages contains a "Required" error message
        // then return a required option error message
        if (isRequired === true) {
          return `Option "--${paramCase(key)}" is required`;
        }

        // Format the error messages into a single
        // invalid option error message
        const formatted = messages
          .map((message) => `  - ${message}`)
          .join('\n');

        return `Option "--${paramCase(key)}" is invalid\n${formatted}`;
      })
      .join('\n\n');

    throw new Error(message);
  }

  // Call the feature action with the transformed and validated options
  // and use the returned props for the terminal executed block
  const props = action(validated.data);
  return {
    featureId: id,
    props: props,
  };
};

export default executeInput;
