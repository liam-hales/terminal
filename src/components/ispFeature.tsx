import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';

/**
 * The `IspFeature` component props
 */
interface Props extends BaseProps {
  readonly name: string;
  readonly asn: number;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly postCode: string;
  readonly latitude: number;
  readonly longitude: number;
}

/**
 * Used to render the output UI
 * for the ISP feature
 *
 * @param props The component props
 * @returns The `IspFeature` component
 */
const IspFeature: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const {
    name,
    asn,
    city,
    region,
    country,
    postCode,
    latitude,
    longitude,
  } = props;

  return (
    <div className="flex flex-col items-start gap-y-6">
      <div className="flex flex-col items-start gap-y-1">
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Name
          </p>
          <p className="text-xs">
            {name}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            ASN
          </p>
          <p className="text-xs">
            {`AS${asn}`}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-1">
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            City
          </p>
          <p className="text-xs">
            {city}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Region
          </p>
          <p className="text-xs">
            {region}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Country
          </p>
          <p className="text-xs">
            {country}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Post Code
          </p>
          <p className="text-xs">
            {postCode}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-1">
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Latitude
          </p>
          <p className="text-xs">
            {latitude}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Longitude
          </p>
          <p className="text-xs">
            {longitude}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IspFeature;
