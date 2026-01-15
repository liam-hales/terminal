import { search } from 'fast-fuzzy';
import { kebabCase } from 'change-case';
import { ValidationException } from '../exceptions';
import { z, ZodObject, ZodRawShape } from 'zod';
import { ParsedInput } from '../types';

/**
 * Used to validate input
 * options against a schema
 *
 * @param input The parsed input
 * @param schema The validation schema
 *
 * @returns The validated options
 */
const validateOptions = <S extends ZodRawShape>(
  input: ParsedInput,
  schema: ZodObject<S>,
): z.infer<typeof schema> => {
  const { command = '', options = {} } = input;

  const validated = schema
    .strict()
    .safeParse(options);

  // Check if the validation was successful, if so then call the feature action with the transformed
  // and validated options and use the returned props for the terminal executed block
  if (validated.success === true) {
    return validated.data;
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

    switch (code) {

      case 'unrecognized_keys': {
        const { keys } = issue;

        // Map each unrecognized key
        // into a separate error
        return keys.map((key) => {
          // Attempt to search for command options that are
          // a close match to the unrecognized key
          const names = Object.keys(schema.shape);
          const matches = search(key, names);

          return {
            match: `--${kebabCase(key)}`,
            message: (matches.length > 0)
              ? `Unknown command option, did you mean ${matches.map((match) => `"--${kebabCase(match)}"`).join(' or ')}?`
              : `Unknown command option "--${kebabCase(key)}"`,
          };
        });
      }

      case 'invalid_type': {
        const { expected } = issue;

        // If the input options does not contain a value for the key then this
        // is considered a required option otherwise there would be no error
        if (options[key] == null) {
          return {
            match: command,
            message: `Command is missing required option "--${kebabCase(key)} <${kebabCase(key)}>"`,
          };
        }

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: `Invalid type, expected: "${expected}"`,
        };
      }

      case 'invalid_format': {
        const { format, message } = issue;

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: (format === 'regex')
            ? `Invalid format, expected: "${message}"`
            : `Invalid format, expected: "${format}"`,
        };
      }

      case 'invalid_value': {
        const { values } = issue;

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: `Invalid value, expected: "${values.toString()}"`,
        };
      }

      case 'invalid_union': {
        const { errors } = issue;

        // If the input options does not contain a value for the key then this
        // is considered a required option otherwise there would be no error
        if (options[key] == null) {
          return {
            match: command,
            message: `Command is missing required option "--${kebabCase(key)} <${kebabCase(key)}>"`,
          };
        }

        // Extract the expected values from
        // each error and its issues
        const expectedValues = errors
          .flatMap((error) => {

            // Extract the invalid types, formats and values to
            // build the expected values for the error message
            return error.map((issue) => {
              switch (issue.code) {
                case 'invalid_type': {
                  return `"${issue.expected}"`;
                }

                case 'invalid_format': {
                  return `"${issue.format}"`;
                }

                case 'invalid_value': {
                  return `"${issue.values.toString()}"`;
                }
              }
            });
          })
          .join(', ');

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: `Invalid value, expected: ${expectedValues}`,
        };
      }

      case 'too_big': {
        const { origin, maximum } = issue;

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: (origin === 'string')
            ? `Value length too long, maximum length: ${maximum}`
            : `Value too big, maximum: ${maximum}`,
        };
      }

      case 'too_small': {
        const { origin, minimum } = issue;

        return {
          match: new RegExp(`(--${kebabCase(key)}\\b)+(?:\\s+[^-\\s]+|="[^"]*"|=[^\\s"]*)?`),
          message: (origin === 'string')
            ? `Value length too short, minimum length: ${minimum}`
            : `Value too small, minimum: ${minimum}`,
        };
      }

      // For any other
      // validation issue
      default: {
        const { message } = issue;
        return {
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

export default validateOptions;
