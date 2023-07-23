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
const parseInput = (input: string): ParsedInput => {
  const args = input.split(' ');

  const { _, ...rest } = Parser(args, {
    configuration: {
      'dot-notation': false,
      'camel-case-expansion': false,
    },
  });

  // Join the commands together with a space
  // to form a single command
  const command = _.join(' ');

  const options = camelcaseKeys(rest);
  const hasOptions = Object.keys(options).length > 0;

  return {
    ...(hasOptions === true) && {
      options: options,
    },
    ...(command !== '') && {
      command: command,
    },
  };
};

export default parseInput;
