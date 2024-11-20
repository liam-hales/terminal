import { ComponentProps } from 'react';
import { z } from 'zod';
import { JWTFeature } from '../../components';
import { jwtOptions } from '.';

/**
 * The JWT feature options
 */
type Options = z.infer<typeof jwtOptions>;

/**
 * The JWT feature component props
 */
type Props = ComponentProps<typeof JWTFeature>;

/**
 * The action used to execute the logic
 * for the JWT feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const jwtAction = async (options: Options): Promise<Props> => {
  const { token } = options;

  try {
    // Split the token at the `.` and for each part of
    // the token, base64 decode, parse and format it
    const [header, payload, signature] = token
      .split('.')
      .map((part, index) => {

        // If the part is the signature,
        // just return as is at this stage
        if (index === 2) {
          return part;
        }

        const decoded = Buffer
          .from(part, 'base64')
          .toString('utf8');

        const parsed = JSON.parse(decoded);
        const formatted = JSON.stringify(parsed, undefined, 2);

        return formatted;
      });

    return {
      header: header,
      payload: payload,
      signature: signature,
    };
  }
  // If any error occurs, it is most likely
  // due to the token being invalid
  catch {
    throw new Error('Failed to decode token');
  }
};

export default jwtAction;
