import { ParsedInput, ValidationError } from '../types';

/**
 * Used to store infomation about errors that have
 * occured during command validation
 */
class ValidationException extends Error {
  private readonly _parsedInput: ParsedInput;
  private readonly _errors: ValidationError[];

  /**
   * Construct the `ValidationException`
   *
   * @param parsedInput The parsed command input
   * @param errors The command validation errors
   */
  constructor(
    parsedInput: ParsedInput,
    errors: ValidationError[],
  ) {
    super('Validation Exception');

    this._parsedInput = parsedInput;
    this._errors = errors;
  }

  /**
   * The parsed command input
   */
  public get parsedInput(): ParsedInput {
    return this._parsedInput;
  }

  /**
   * The command validation errors
   */
  public get errors(): ValidationError[] {
    return this._errors;
  }
}

export default ValidationException;
