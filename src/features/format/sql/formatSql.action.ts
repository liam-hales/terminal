import { ComponentProps } from 'react';
import { z } from 'zod';
import { TextOutput } from '../../../components';
import { formatSqlOptions } from '.';
import { format } from 'sql-formatter';

/**
 * The format SQL feature options
 */
type Options = z.infer<typeof formatSqlOptions>;

/**
 * The format SQL feature component props
 */
type Props = ComponentProps<typeof TextOutput>;

/**
 * The action used to execute the logic
 * for the format SQL feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const formatSqlAction = async (options: Options): Promise<Props> => {
  const { value, dialect } = options;

  // Format the SQL string value
  // using `sql-formatter`
  const formatted = format(value, {
    language: dialect,
    useTabs: false,
    tabWidth: 2,
  });

  return {
    value: formatted,
  };
};

export default formatSqlAction;
