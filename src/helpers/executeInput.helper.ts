import { kebabCase } from 'change-case';
import { search } from 'fast-fuzzy';
import { features } from '../features';
import { FeatureOption, FeatureOutput, ParsedInput } from '../types';
import { ValidationException } from '../exceptions';
import { serverAction } from './';

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
const executeInput = async (input: ParsedInput): Promise<FeatureOutput> => {
  const {
    command: inputCommand,
    options: inputOptions = {},
  } = input;

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

  const { id, command, enabled } = feature;
  const { options, execution, action } = command;

  // If the feature has not been
  // enabled, then throw an error
  if (enabled === false) {
    throw new ValidationException(input, [
      {
        match: inputCommand,
        message: 'This feature has been disabled',
      },
    ]);
  }

  // If the help option has been set to true, return
  // the help feature output for said command
  if (inputOptions.help === true) {
    return {
      featureId: 'help',
      props: {
        command: command,
      },
    };
  }

  const validated = options
    .strict()
    .safeParse(inputOptions);

  // Check if the validation was successful, if so then call the feature action with the transformed
  // and validated options and use the returned props for the terminal executed block
  if (validated.success === true) {

    // If the command execution needs to be done on the server, wrap the
    // action in the `serverAction` helper to execute this correctly
    if (execution === 'server') {
      const response = await serverAction(action, validated.data as FeatureOption);

      // Check the response status and if there was an error, throw
      // a new error using the error message from the response
      if (response.status === 'error') {
        throw new Error(response.errorMessage);
      }

      return {
        featureId: id,
        props: response.data,
      } as FeatureOutput;
    }

    const props = await action(validated.data as FeatureOption);
    return {
      featureId: id,
      props: props,
    } as FeatureOutput;
  }

  // The validation failed, extract the error
  // and issues from the validation data
  const { error } = validated;
  const { issues } = error;

  // Flat map the validation issues into validation errors
  // which will be used for the `ValidationException`
  const errors = issues.flatMap((issue) => {
    const { path, code } = issue;

    // Join the `path` to create the key. The `path` from
    // the issue will mostly always be a single item array
    const key = path.join('.');

    // Switch for the validation `issueCode`
    switch (code) {

      // For an unrecognized keys
      // validation issue
      case 'unrecognized_keys': {
        const { keys } = issue;

        // Map each unrecognized key
        // into a separate error
        return keys.map((key) => {
          // Attempt to search for command options that are
          // a close match to the unrecognized key
          const names = Object.keys(options.shape);
          const matches = search(key, names);

          return {
            match: `--${kebabCase(key)}`,
            message: (matches.length > 0)
              ? `Unknown command option, did you mean ${matches.map((match) => `"--${kebabCase(match)}"`).join(' or ')}?`
              : `Unknown command option "--${kebabCase(key)}"`,
          };
        });
      }

      // For an invalid union
      // validation issue
      case 'invalid_union': {
        const { unionErrors } = issue;

        // Flat map the union errors into
        // the `invalid_literal` issues
        const issues = unionErrors.flatMap((error) => {
          const { issues } = error;
          return issues.filter((issue) => issue.code === 'invalid_literal');
        });

        // If every issue from the union errors has a missing `received` value
        // then the issue is considered a required options error
        const isRequired = issues.every((issue) => issue.received == null);
        const expectedValues = issues
          .map((issue) => `"${issue.expected}"`)
          .join(', ');

        return (isRequired === true)
          ? {
              match: inputCommand,
              message: `Command is missing required option "--${kebabCase(key)} <${kebabCase(key)}>"`,
            }
          : {
              match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
              message: `Expected one of the following values: ${expectedValues}`,
            };
      }

      // For any other
      // validation issue
      default: {
        const { message } = issue;

        // If the issue message contains `required` then the
        // issue is considered a required options error
        const isRequired = message
          .toLowerCase()
          .includes('required');

        return (isRequired === true)
          ? {
              match: inputCommand,
              message: `Command is missing required option "--${kebabCase(key)} <${kebabCase(key)}>"`,
            }
          : {
              match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
              message: message,
            };
      }
    }
  });

  // Throw the `ValidationException` with the
  // parsed input and mapped error details
  throw new ValidationException(input, errors);
};

export default executeInput;
