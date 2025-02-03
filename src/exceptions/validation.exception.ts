import { ParsedInput, ValidationError } from '../types';

/**
 * Used to store information about errors that have
 * occurred during command validation
 */
class ValidationException extends Error {
  private readonly _parsedInput: ParsedInput;
  private readonly _errors: Omit<ValidationError, 'line' | 'position'>[];

  /**
   * Construct the `ValidationException`
   *
   * @param parsedInput The parsed command input
   * @param errors The validation errors
   */
  constructor(
    parsedInput: ParsedInput,
    errors: Omit<ValidationError, 'line' | 'position'>[],
  ) {
    super('Validation Exception');

    this._parsedInput = parsedInput;
    this._errors = errors;
  }

  /**
   * Used to get the full `RegExp` to match against
   * which is built up from the `match` from each error
   */
  public get regex(): RegExp {
    // Map the errors into a regex pattern made up of the matches
    // from each error which will then be used to build the regex
    const pattern = this._errors
      .map((error) => {
        const { match } = error;

        return (typeof match === 'string')
          ? match
          : match.source;
      })
      .join('|');

    // Use the pattern to create the regex that will be
    // used to match the errors in the input string
    return new RegExp(pattern);
  }

  /**
   * The errors used to describe
   * each validation error
   */
  public get errors(): ValidationError[] {
    const { rawInput } = this._parsedInput;

    // Map the validation errors into errors with the
    // line and position relative to the input command
    return this._errors
      .map((error) => {
        const { match } = error;
        const result = rawInput.match(match);

        // Return the error data along
        // with the line and position
        return {
          ...error,
          line: 1,
          position: (result?.index != null)
            ? result.index + 1
            : 0,
        };
      })
      .sort((first, second) => {
        // Sort the errors by their position value
        // so they display in the correct order
        return first.position - second.position;
      });
  }
}

export default ValidationException;
