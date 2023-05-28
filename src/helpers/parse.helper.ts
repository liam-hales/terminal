/* eslint-disable @typescript-eslint/naming-convention */

import Parser from 'yargs-parser/browser';
import camelcaseKeys from 'camelcase-keys';
import { ParsedInput } from '../types';

/**
 * Used to parse a given `input` using
 * `yargs-parser` under the hood
 *
 * @param input The input to parse
 * @returns The parsed input
 */
const parse = (input: string): ParsedInput => {
  const args = input.split(' ');

  const { _, ...rest } = Parser(args, {
    configuration: {
      'dot-notation': false,
      'camel-case-expansion': false,
    },
  });

  const [command] = _;

  // If the command is not a string
  // then throw an error
  if (typeof command !== 'string') {
    throw new Error('Command needs to be a string');
  }

  const options = camelcaseKeys(rest);
  const hasOptions = Object.keys(options).length > 0;

  return {
    ...(command !== '') && {
      command: command,
    },
    ...(hasOptions === true) && {
      options: options,
    },
  };
};

export default parse;
