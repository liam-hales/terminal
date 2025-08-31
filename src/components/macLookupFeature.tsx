import { FunctionComponent, ReactElement, Fragment } from 'react';
import { BaseProps } from '../types';

/**
 * The `MacLookupFeature` component props
 */
interface Props extends BaseProps {
  readonly type: string;
  readonly startHex: string;
  readonly endHex: string;
  readonly company: string;
  readonly address: {
    readonly lineOne?: string;
    readonly lineTwo?: string;
    readonly lineThree?: string;
    readonly country: string;
  };
}

/**
 * Used to render the output UI for
 * the MAC address lookup feature
 *
 * @param props The component props
 * @returns The `MacLookupFeature` component
 */
const MacLookupFeature: FunctionComponent<Props> = ({ type, startHex, endHex, company, address }): ReactElement<Props> => {

  const { lineOne, lineTwo, lineThree, country } = address;
  return (
    <Fragment>
      <p className="font-mono text-sm text-white">
        {company}
      </p>
      <div className="flex flex-col gap-y-1 pt-4">
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 font-mono text-sm text-emerald-300">
            Type
          </p>
          <p className="font-mono text-sm text-white">
            {type}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 font-mono text-sm text-emerald-300">
            HEX
          </p>
          <p className="font-mono text-sm text-white">
            {`${startHex} -> ${endHex}`}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 font-mono text-sm text-emerald-300">
            Address
          </p>
          <div className="flex flex-col">
            {
              (lineOne != null) && (
                <p className="font-mono text-sm text-white">
                  {lineOne}
                </p>
              )
            }
            {
              (lineTwo != null) && (
                <p className="font-mono text-sm text-white">
                  {lineTwo}
                </p>
              )
            }
            {
              (lineThree != null) && (
                <p className="font-mono text-sm text-white">
                  {lineThree}
                </p>
              )
            }
            <p className="font-mono text-sm text-white">
              {country}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MacLookupFeature;
