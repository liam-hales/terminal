import { ParsedInput, ValidationErrorDetails } from '../types';

/**
 * Used to store information about errors that have
 * occurred during command validation
 */
class ValidationException extends Error {
  private readonly _parsedInput: ParsedInput;
  private readonly _details: ValidationErrorDetails;

  /**
   * Construct the `ValidationException`
   *
   * @param parsedInput The parsed command input
   * @param details The details for the validation error
   */
  constructor(
    parsedInput: ParsedInput,
    details: ValidationErrorDetails,
  ) {
    super('Validation Exception');

    this._parsedInput = parsedInput;
    this._details = details;
  }

  /**
   * The parsed command input
   */
  public get parsedInput(): ParsedInput {
    return this._parsedInput;
  }

  /**
   * The details used to describe
   * the validation error
   */
  public get details(): ValidationErrorDetails {
    return this._details;
  }
}

export default ValidationException;
