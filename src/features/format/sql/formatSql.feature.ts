import { buildFeature } from '../../../helpers';
import { TextOutput } from '../../../components';
import { formatSqlOptions, formatSqlAction } from './';

/**
 * The format SQL feature, executed with `format sql`, used to
 * format a given SQL string using `sql-formatter` under the hood
 */
const formatSqlFeature = buildFeature('managed', {
  id: 'format-sql',
  command: 'format sql',
  description: 'Used to format a given SQL string',
  options: formatSqlOptions,
  execution: 'client',
  action: formatSqlAction,
  component: TextOutput,
  isEnabled: true,
});

export default formatSqlFeature;
