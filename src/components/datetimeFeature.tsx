import { FunctionComponent, ReactElement, Fragment } from 'react';
import { BaseProps } from '../types';

/**
 * The `DatetimeFeature` component props
 */
interface Props extends BaseProps {
  readonly pretty: {
    readonly date: string;
    readonly time: string;
  };
  readonly data: {
    readonly name: string;
    readonly value: string | number;
  }[];
}

/**
 * Used to render the output UI
 * for the datetime feature
 *
 * @param props The component props
 * @returns The `DatetimeFeature` component
 */
const DatetimeFeature: FunctionComponent<Props> = ({ pretty, data }): ReactElement<Props> => {

  const { date, time } = pretty;
  return (
    <Fragment>
      <p className="font-mono text-sm text-white">
        {date}
      </p>
      <p className="font-mono text-sm text-white">
        {time}
      </p>
      <div className="flex flex-col gap-y-1 pt-4">
        {
          data.map((item) => {
            const { name, value } = item;

            return (
              <div
                className="flex flex-row"
                key={`datetime-${name}`}
              >
                <p className="min-w-48 max-w-48 font-mono text-sm text-emerald-300">
                  {name}
                </p>
                <p className="font-mono text-sm text-white">
                  {value}
                </p>
              </div>
            );
          })
        }
      </div>
    </Fragment>
  );
};

export default DatetimeFeature;
