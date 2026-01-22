'use client';

/**
 * The `encryptData` helper response
 */
interface EncryptDataResponse {
  readonly iv: string;
  readonly ciphertext: string;
  readonly key: string;
}

/**
 * Used to encrypt data on the client using
 * the standard `crypto` library
 *
 * @param data The data to encrypt
 * @returns The encrypted data and encryption key
 */
const encryptData = async (data: string): Promise<EncryptDataResponse> => {

  // Generate a new 96-bit random
  // initialisation vector
  const ivBuffer = crypto.getRandomValues(
    new Uint8Array(12),
  );

  // Generate a new AES-GCM 256-bit encryption key
  // which will be used for encryption
  const cryptoKey = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    [
      'encrypt',
      'decrypt',
    ],
  );

  // Encode the data and encrypt it using the
  // AES-GCM algorithm and generated key
  const encoded = new TextEncoder().encode(data);
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: ivBuffer,
    },
    cryptoKey,
    encoded,
  );

  // Export the key into
  // its raw format
  const keyBuffer = await crypto.subtle.exportKey('raw', cryptoKey);

  // Encode the IV, ciphertext and
  // encryption key to base64
  const ivBase64 = btoa(String.fromCharCode(...ivBuffer));
  const cipherBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
  const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(keyBuffer)));

  return {
    iv: ivBase64,
    ciphertext: cipherBase64,
    key: keyBase64,
  };
};

export default encryptData;
