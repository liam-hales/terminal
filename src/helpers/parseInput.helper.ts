/* eslint-disable @typescript-eslint/naming-convention */

import Parser from 'yargs-parser/browser';
import camelcaseKeys from 'camelcase-keys';
import { ParsedInput } from '../types';

/**
 * Used to parse a given `input` using
 * the `yargs-parser` package under the hood
 *
 * @param input The input to parse
 * @returns The parsed input
 */
const parseInput = (input: string): ParsedInput => {

  // Parse the input using `yargs-parser` with the config
  // to disable things such as dot notation
  const { _, ...rest } = Parser(input, {
    configuration: {
      'dot-notation': false,
      'camel-case-expansion': false,
      'boolean-negation': false,
    },
  });

  // Join the commands together with a space
  // to form a single command
  const command = _.join(' ');
  const mapped = Object
    .keys(rest)
    .reduce((map, key) => {

      // See if the value is infact a boolean
      // that has been set as a string
      const value = rest[key];
      const isBoolean =
        value === 'true' ||
        value === 'false';

      // Return the map with the value
      // correctly set as a boolean
      return {
        ...map,
        [key]: (isBoolean === true)
          ? value === 'true'
          : value,
      };
    }, {});

  const options = camelcaseKeys(mapped);
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
