import features from '../features';
import { ParsedInput, TerminalOutputBlock } from '../types';
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
 * @returns The terminal output block
 */
const executeInput = (input: ParsedInput): TerminalOutputBlock => {
  const {
    command: inputCommand,
    options: inputOptions = {},
  } = input;

  // Attempt to find a feature with a command
  // that matches the input command
  const feature = features.find((feature) => {
    const { name } = feature.command;
    return name === inputCommand;
  });

  // If a feature cannot be found for the
  // command, then throw an error
  if (feature == null) {
    throw new Error(`Command "${inputCommand}" does not exist`);
  }

  const { id, command, enabled } = feature;
  const { name, options, action } = command;
  const { schema } = options;

  // If the feature has not been
  // enabled, then throw an error
  if (enabled === false) {
    throw new Error(`This "${name}" feature has been disabled`);
  }

  const validated = schema
    .strict()
    .safeParse(inputOptions);

  // Check if the validation failed, if so map the errors
  // into an a single message and throw an error
  if (validated.success === false) {
    const { error } = validated;
    const { fieldErrors } = error.flatten();

    // Map the validation errors into a message
    // for the error that will be thrown
    const message = extractKeys(fieldErrors)
      .map((key) => {
        const messages = fieldErrors[key] ?? [];
        const formatted = messages
          .map((message) => `  - ${message}`)
          .join('\n');

        return `Option "${key}"\n${formatted}`;
      })
      .join('\n');

    throw new Error(message);
  }

  // Call the feature action with the transformed and validated options
  // and use the returned props for the terminal output block
  const props = action(validated.data);
  return {
    type: 'output',
    value: {
      featureId: id,
      props: props,
    },
  };
};

export default executeInput;
