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
              <p className="font-mono text-sm font-bold text-white">
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
                          <p className="min-w-52 max-w-52 font-mono text-sm text-pink-300">
                            {key}
                          </p>
                          {
                            (typeof value === 'string') && (
                              <div className="flex flex-row gap-x-2">
                                <p className="font-mono text-sm text-white">
                                  |
                                </p>
                                <p className={`
                                  font-mono text-sm
                                  ${(value === 'REDACTED') ? 'text-red-300' : 'text-white'}`}
                                >
                                  {value}
                                </p>
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
                                        key={`whois-${serverName}-${key}-${item}`}
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
