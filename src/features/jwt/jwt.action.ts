import { ComponentProps } from 'react';
import { z } from 'zod';
import { decode } from 'jsonwebtoken';
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

  // Decode the token value
  // using `jsonwebtoken`
  const decoded = decode(token, {
    complete: true,
  });

  // Check if the token was successfully deocded
  // If not then throw an error
  if (decoded == null) {
    throw new Error('Failed to decode token');
  }

  // Format the decoded token
  // header and payload
  const header = JSON.stringify(decoded.header, undefined, 2);
  const payload = JSON.stringify(decoded.payload, undefined, 2);

  return {
    header: header,
    payload: payload,
    signature: decoded.signature,
  };
};

export default jwtAction;
