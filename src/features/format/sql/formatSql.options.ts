import { z } from 'zod';
import { supportedDialects, SqlLanguage } from 'sql-formatter';

/**
 * Describes all SQL dialects used to build the
 * validation schema for the `dialect` option
 */
const dialects = [...supportedDialects] as SqlLanguage[];

/**
 * The format SQL options schema used to describe the
 * format SQL feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const formatSqlOptions = z.object({
  value: z
    .string()
    .min(1)
    .describe('The SQL value to format'),
  dialect: z
    .union(dialects.map((dialect) => z.literal(dialect)))
    .optional()
    .default('sql')
    .describe('The SQL dialect'),
});

export default formatSqlOptions;
