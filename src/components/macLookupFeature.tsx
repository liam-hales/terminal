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
      <p className="text-xs">
        {company}
      </p>
      <div className="flex flex-col gap-y-1 pt-4">
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 text-xs">
            Type
          </p>
          <p className="text-xs">
            {type}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 text-xs">
            HEX
          </p>
          <p className="text-xs">
            {`${startHex} -> ${endHex}`}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="min-w-48 max-w-48 text-xs">
            Address
          </p>
          <div className="flex flex-col">
            {
              (lineOne != null) && (
                <p className="text-xs">
                  {lineOne}
                </p>
              )
            }
            {
              (lineTwo != null) && (
                <p className="text-xs">
                  {lineTwo}
                </p>
              )
            }
            {
              (lineThree != null) && (
                <p className="text-xs">
                  {lineThree}
                </p>
              )
            }
            <p className="ext-sm">
              {country}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MacLookupFeature;
