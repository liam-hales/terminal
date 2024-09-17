import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import { WhoisData } from './types';

/**
 * The `WhoisFeature` component props
 */
interface Props extends BaseProps {
  readonly data: WhoisData;
}

/**
 * Used to render the output UI
 * for the Whois feature
 *
 * @param props The component props
 * @returns The `WhoisFeature` component
 */
const WhoisFeature: FunctionComponent<Props> = ({ className, data }): ReactElement<Props> => {

  const serverKeys = Object.keys(data);
  const serverValues = Object.values(data);

  return (
    <div className={`${className} flex flex-col`}>
      {
        serverKeys.map((serverKey, serverIndex) => {

          const itemKeys = Object.keys(serverValues[serverIndex]);
          const itemValues = Object.values(serverValues[serverIndex]);

          return (
            <div
              className="pb-4"
              key={`whois-${serverKey}`}
            >
              <p className="font-mono text-sm font-bold text-white">
                Server:
                {' '}
                {serverKey}
              </p>
              <div className="flex flex-col gap-y-1 pt-2">
                {
                  itemKeys.map((itemKey, itemIndex) => {
                    const value = itemValues[itemIndex];

                    return (
                      <div
                        className="flex flex-row"
                        key={`whois-${serverKey}-${itemKey}`}
                      >
                        <p className="min-w-52 max-w-52 font-mono text-sm text-pink-300">
                          {itemKey}
                        </p>
                        {
                          (typeof value === 'string') && (
                            <div className="flex flex-row gap-x-2">
                              <p className="font-mono text-sm text-white">
                                |
                              </p>
                              {
                                (value !== '') && (
                                  <p className="font-mono text-sm text-white">
                                    {value}
                                  </p>
                                )
                              }
                              {
                                (value === '') && (
                                  <p className="font-mono text-sm italic text-red-300">
                                    REDACTED
                                  </p>
                                )
                              }
                            </div>
                          )
                        }
                        {
                          (Array.isArray(value) === true) && (
                            <div
                              className="flex flex-col pt-2 pb-2"
                            >
                              {
                                value.map((item) => {
                                  return (
                                    <div
                                      className="flex flex-row gap-x-2"
                                      key={`whois-${serverKey}-${itemKey}-${item}`}
                                    >
                                      <p className="font-mono text-sm text-white">
                                        -
                                      </p>
                                      <p className="font-mono text-sm text-white">
                                        {item}
                                      </p>
                                    </div>
                                  );
                                })
                              }
                            </div>
                          )
                        }
                      </div>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default WhoisFeature;