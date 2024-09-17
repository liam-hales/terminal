import { buildFeature } from '../../helpers';
import { DatetimeFeature } from '../../components';
import { datetimeOptions, datetimeAction } from '.';

/**
 * The datetime feature, executed with `datetime`, used to display the
 * current, or a specific date and time in multipe different formats
 */
const datetimeFeature = buildFeature({
  id: 'datetime',
  command: {
    name: 'datetime',
    description: 'Used to display the current, or a specific date and time in multipe different formats',
    options: datetimeOptions,
    action: datetimeAction,
  },
  component: DatetimeFeature,
  enabled: true,
});

export default datetimeFeature;