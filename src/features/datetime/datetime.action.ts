import { ComponentProps } from 'react';
import { z } from 'zod';
import { GroupedListOutput } from '../../components';
import { datetimeOptions } from '.';
import date from '../../date';

/**
 * The datetime feature options
 */
type Options = z.infer<typeof datetimeOptions>;

/**
 * The datetime feature component props
 */
type Props = ComponentProps<typeof GroupedListOutput>;

/**
 * The action used to execute the logic
 * for the datetime feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const datetimeAction = (options: Options): Props => {
  const { value, timezone } = options;

  // Guess the users current timezone and the actual
  // timezone based on the `timezone` option
  const currentTimezone = date.tz.guess();
  const actualTimezone = (timezone === 'current')
    ? currentTimezone
    : timezone;

  // Parse the date from the `value`
  // and `timezone` options
  const parsedDate = (actualTimezone == null)
    ? date.utc(value)
    : date
        .utc(value)
        .tz(actualTimezone);

  // Get the data from the date object required for the
  // feature component props and return said data
  return {
    spacing: 'large',
    groups: [
      {
        items: [
          parsedDate.format('dddd, D MMMM YYYY'),
          parsedDate.format('hh:mm a'),
        ],
      },
      {
        items: [
          {
            name: 'Date',
            value: parsedDate.format('DD-MM-YYYY'),
          },
          {
            name: 'Time',
            value: parsedDate.format('HH:mm:ss.SSS'),
          },
          {
            name: 'Timezone',
            value: actualTimezone ?? 'UTC',
          },
          {
            name: 'Offset',
            value: parsedDate.format('Z'),
          },
          {
            name: 'ISO Timestamp',
            value: parsedDate.toISOString(),
          },
          {
            name: 'UNIX (seconds)',
            value: parsedDate
              .unix()
              .toString(),
          },
          {
            name: 'UNIX (milliseconds)',
            value: parsedDate
              .valueOf()
              .toString(),
          },
          {
            name: 'Relative',
            value: parsedDate.fromNow(),
          },
        ],
      },
    ],
  };
};

export default datetimeAction;
