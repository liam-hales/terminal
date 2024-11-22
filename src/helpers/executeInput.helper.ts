import { kebabCase } from 'change-case';
import { search } from 'fast-fuzzy';
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

    // Attempt to search for features that are
    // a close match to the input command
    const names = features.map((feature) => feature.command.name);
    const matches = search(inputCommand, names);

    throw new ValidationException(input, [
      {
        name: 'Unknown command',
        match: inputCommand,

        // If there are matches then use them to
        // build the validation error details
        details: (matches.length > 0)
          ? [`Command not found, did you mean ${matches.map((match) => `"${match}"`).join(' or ')}?`]
          : ['Command not found, use "help" to list available commands'],
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

  // Check if the validation was successful, if so then call the feature action with the transformed
  // and validated options and use the returned props for the terminal executed block
  if (validated.success === true) {

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

  // Map the validation issues into validation errors which
  // will be used for the `ValidationException`
  const errors = issues.reduce<ValidationError[]>((map, issue) => {
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

        return [
          ...map,
          {
            name: 'Unknown options',
            match: keys.map((key) => `--${kebabCase(key)}`),
            details: 'Unknown command options have been found',
          },
        ];
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

        // If every issue from the unuin errors has a missing `received` value
        // then the issue is considerd a required options error
        const isRequired = issues.every((issue) => issue.received == null);
        const expectedValues = issues
          .map((issue) => `"${issue.expected}"`)
          .join(', ');

        return [
          ...map,
          (isRequired === true)
            ? {
                key: key,
                name: 'Required options',
                match: inputCommand,
                details: 'Command is missing required options',
                suggestion: `--${kebabCase(key)} <${kebabCase(key)}>`,
              }
            : {
                name: 'Invalid option',
                // If the input value is `true` then make sure to add a match for the option
                // key on it's own as boolean options can be set with no explicit value
                match: (inputOptions[key] === true)
                  ? [
                      `--${kebabCase(key)}`,
                      `--${kebabCase(key)} ${inputOptions[key]}`,
                    ]
                  : [
                      `--${kebabCase(key)} ${inputOptions[key]}`,
                    ],
                details: `Expected one of the following values: ${expectedValues}`,
              },
        ];
      }

      // For any other
      // validation issue
      default: {
        const { message } = issue;

        // Find the existing error in
        // the map to merge with
        const existing = map.find((error) => error.key === key);

        // If the issue message contains `required` then the
        // issue is considerd a required options error
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
                    ...(Array.isArray(details) === true) ? details : [details],
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
                match: inputCommand,
                details: 'Command is missing required options',
                suggestion: `--${kebabCase(key)} <${kebabCase(key)}>`,
              }
            : {
                key: key,
                name: 'Invalid option',
                // If the input value is `true` then make sure to add a match for the option
                // key on it's own as boolean options can be set with no explicit value
                match: (inputOptions[key] === true)
                  ? [
                      `--${kebabCase(key)}`,
                      `--${kebabCase(key)} ${inputOptions[key]}`,
                    ]
                  : [
                      `--${kebabCase(key)} ${inputOptions[key]}`,
                    ],
                details: message,
              },
        ];
      }
    }
  }, []);

  // Throw the `ValidationException` with the
  // parsed input and mapped errors
  throw new ValidationException(input, errors);
};

export default executeInput;
