import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../components';
import { extractKeys } from '../../helpers';
import { passGenOptions } from '.';

/**
 * The password generator
 * feature options
 */
type Options = z.infer<typeof passGenOptions>;

/**
 * The password generator
 * feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic for
 * the password generator feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const passGenAction = async (options: Options): Promise<Props> => {
  const { length } = options;

  // Define the character values
  // map for each option
  const valuesMap: Record<keyof Omit<Options, 'length'>, string> = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
  };

  // Generate the character pool used
  // to generate the password
  const pool = extractKeys(valuesMap)
    .reduce((previous, key) => {

      // If the option that matches the key from the values map has
      // been set to `true`, then include it's values in the pool
      return (options[key] === true)
        ? `${previous}${valuesMap[key]}`
        : previous;
    }, '');

  // Generate the password with the
  // length from the options
  const password = [...Array(length)]
    .reduce<string>((previous) => {

      // Generate a random index for the pool of characters and return
      // the previous value appended with the new character
      const index = Math.floor(Math.random() * pool.length);
      const character = pool[index];

      return `${previous}${character}`;
    }, '');

  return {
    value: password,
  };
};

export default passGenAction;
