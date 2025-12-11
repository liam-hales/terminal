import { buildFeature } from '../../helpers';
import { DatetimeFeature } from '../../components';
import { datetimeOptions, datetimeAction } from '.';

/**
 * The datetime feature, executed with `datetime`, used to display the
 * current, or a specific date and time in multiple different formats
 */
const datetimeFeature = buildFeature({
  id: 'datetime',
  command: {
    name: 'datetime',
    description: 'Used to display the current, or a specific date and time in multiple different formats',
    options: datetimeOptions,
    execution: 'client',
    action: datetimeAction,
  },
  component: DatetimeFeature,
  isEnabled: true,
});

export default datetimeFeature;
