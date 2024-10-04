import { kebabCase } from 'change-case';
import { features } from '../features';
import { FeatureOption, FeatureOutput, ParsedInput, ValidationError } from '../types';
import { ValidationException } from '../exceptions';

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
    throw new ValidationException(input, [
      {
        name: 'Unknown command',
        match: inputCommand,
        details: 'This command does not exist',
      },
    ]);
  }

  const { id, command, enabled } = feature;
  const { options, action } = command;

  // If the feature has not been
  // enabled, then throw an error
  if (enabled === false) {
    throw new ValidationException(input, [
      {
        name: 'Feature disabled',
        match: inputCommand,
        details: 'This feature has been disabled',
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

  // Check if the validation failed, if so map the errors
  // into an a single message and throw an error
  if (validated.success === false) {
    const { error } = validated;
    const { issues } = error;

    // Map the validation issues into validation errors which
    // will be used for the `ValidationException`
    const errors = issues.reduce<ValidationError[]>((map, issue) => {
      const { path, code } = issue;

      // Switch for the validation
      // issues `code`
      switch (code) {

        // For an unrecognized keys
        // validation issue
        case 'unrecognized_keys': {
          const { keys } = issue;

          return [
            ...map,
            {
              name: 'Unknown options',
              match: keys.map((key) => `--${kebabCase(key)}`),
              details: 'Unknown command options have been found',
            },
          ];
        }

        // For any other
        // validation issue
        default: {
          const { message } = issue;

          // Join the paths to make the key and find the existing error in the map
          // The `path` from the issue will mostly always be a single item array
          const key = path.join('.');
          const existing = map.find((error) => error.key === key);

          const isRequired = message
            .toLowerCase()
            .includes('required');

          // If there is an existing validation error in the
          // map then combine it with the current one
          if (existing != null) {
            const { suggestion, details } = existing;

            return [
              ...map,
              (isRequired === true)
                ? {
                    ...existing,
                    suggestion: [existing.suggestion, suggestion].join(' '),
                  }
                : {
                    ...existing,
                    details: [
                      ...(Array.isArray(details) === true ? details : [details]),
                      message,
                    ],
                  },
            ];
          }

          return [
            ...map,
            (isRequired === true)
              ? {
                  key: key,
                  name: 'Required options',
                  match: [inputCommand],
                  details: 'Command is missing required options',
                  suggestion: `--${kebabCase(key)} <${kebabCase(key)}>`,
                }
              : {
                  key: key,
                  name: 'Invalid option',
                  match: [`--${kebabCase(key)} ${inputOptions[key]}`],
                  details: message,
                },
          ];
        }
      }
    }, []);

    // Throw the `ValidationException` with the
    // parsed input and mapped errors
    throw new ValidationException(input, errors);
  }

  // Call the feature action with the transformed and validated options
  // and use the returned props for the terminal executed block
  const props = await action(validated.data as FeatureOption);
  return {
    featureId: id,
    props: props,
  } as FeatureOutput;
};

export default executeInput;
