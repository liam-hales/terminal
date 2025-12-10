import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import { WhoisResult } from './types';

/**
 * The `WhoisFeature` component props
 */
interface Props extends BaseProps {
  readonly results: WhoisResult[];
}

/**
 * Used to render the output UI
 * for the Whois feature
 *
 * @param props The component props
 * @returns The `WhoisFeature` component
 */
const WhoisFeature: FunctionComponent<Props> = ({ className, results }): ReactElement<Props> => {
  return (
    <div className={`${className ?? ''} flex flex-col`}>
      {
        results.map((result) => {
          const { serverName, data } = result;

          return (
            <div
              className="pb-4"
              key={`whois-${serverName}`}
            >
              <p className="text-xs">
                Server:
                {' '}
                {serverName}
              </p>
              <div className="flex flex-col gap-y-1 pt-2">
                {
                  Object
                    .keys(data)
                    .map((key) => {
                      const value = data[key];

                      return (
                        <div
                          className="flex flex-row"
                          key={`whois-${serverName}-${key}`}
                        >
                          <p className="min-w-58 max-w-58 text-xs">
                            {key}
                          </p>
                          {
                            (typeof value === 'string') && (
                              <p className="text-xs">
                                {value}
                              </p>
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
                                        key={`whois-${serverName}-${key}-${item}`}
                                      >
                                        <p className="text-xs">
                                          -
                                        </p>
                                        <p className="text-xs">
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
