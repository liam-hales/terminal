import { ComponentProps } from 'react';
import { z } from 'zod';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { GroupedListOutput } from '../../components';
import { datetimeOptions } from '.';

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

  // Apply the Day.js plugins to `dayjs` in order
  // to extend its functionality
  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.extend(relativeTimePlugin);

  // Guess the users current timezone and the actual
  // timezone based on the `timezone` option
  const currentTimezone = dayjs.tz.guess();
  const actualTimezone = (timezone === 'current')
    ? currentTimezone
    : timezone;

  // Get the date from the `value`
  // and `timezone` options
  const date = (actualTimezone == null)
    ? dayjs.utc(value)
    : dayjs
        .utc(value)
        .tz(actualTimezone);

  // Get the data from the date object required for the
  // feature component props and return said data
  return {
    spacing: 'large',
    groups: [
      {
        items: [
          date.format('dddd, D MMMM YYYY'),
          date.format('hh:mm a'),
        ],
      },
      {
        items: [
          {
            name: 'Date',
            value: date.format('DD-MM-YYYY'),
          },
          {
            name: 'Time',
            value: date.format('HH:mm:ss.SSS'),
          },
          {
            name: 'Timezone',
            value: actualTimezone ?? 'UTC',
          },
          {
            name: 'Offset',
            value: date.format('Z'),
          },
          {
            name: 'ISO Timestamp',
            value: date.toISOString(),
          },
          {
            name: 'UNIX (seconds)',
            value: date
              .unix()
              .toString(),
          },
          {
            name: 'UNIX (milliseconds)',
            value: date
              .valueOf()
              .toString(),
          },
          {
            name: 'Relative',
            value: date.fromNow(),
          },
        ],
      },
    ],
  };
};

export default datetimeAction;
