/* eslint-disable object-curly-newline */

'use server';

import { generateKeyPairSync } from 'crypto';
import { ComponentProps } from 'react';
import { z } from 'zod';
import { KeyPairFeature } from '../../components';
import { keyPairOptions } from '.';

/**
 * The key pair feature options
 */
type Options = z.infer<typeof keyPairOptions>;

/**
 * The key pair feature component props
 */
type Props = ComponentProps<typeof KeyPairFeature>;

/**
 * The action used to execute the logic
 * for the key pair feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const keysAction = async (options: Options): Promise<Props> => {
  const { alg, format, size } = options;

  /**
   * Generates a public and private key pair objects. Used to wrap the `generateKeyPairSync`
   * function from `crypto` and work around some type issues
   *
   * @returns The generated key pair objects
   */
  const generateKeyPair = (): ReturnType<typeof generateKeyPairSync> => {

    // Switch for the `alg` option and generate
    // the key pair objects for each algorithm
    switch (alg) {
      case 'rsa': return generateKeyPairSync(alg, { modulusLength: size });
      case 'rsa-pss': return generateKeyPairSync(alg, { modulusLength: size });
      case 'ed25519': return generateKeyPairSync(alg);
      case 'x25519': return generateKeyPairSync(alg);

      default: {
        throw new Error(`Unknown algorithm "${alg}"`);
      }
    }
  };

  // Generate the key pair objects
  // using the wrapper function
  const { publicKey, privateKey } = generateKeyPair();

  // If the `format` option has been set to `jwk` then export the keys
  // in the JWK format and stringify the keys for the component props
  if (format === 'jwk') {

    const publicJwk = publicKey.export({ format: format });
    const privateJwk = privateKey.export({ format: format });

    return {
      publicKey: JSON.stringify(publicJwk, undefined, 2),
      privateKey: JSON.stringify(privateJwk, undefined, 2),
    };
  }

  // Export the public and private key pair in the format from the
  // `format` option and return them for the component props

  const publicKeyExport = publicKey
    .export({
      type: 'spki',
      format: format,
    })
    .toString();

  const privateKeyExport = privateKey
    .export({
      type: 'pkcs8',
      format: format,
    })
    .toString();

  return {
    publicKey: publicKeyExport,
    privateKey: privateKeyExport,
  };
};

export default keysAction;
