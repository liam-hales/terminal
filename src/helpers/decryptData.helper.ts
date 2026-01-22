'use client';

/**
 * Used to decrypt data on the client using
 * the standard `crypto` library
 *
 * @param iv The initialisation vector
 * @param ciphertext The ciphertext to decrypt
 * @param key The encryption key
 *
 * @returns The decrypted data
 */
const decryptData = async (
  iv: string,
  ciphertext: string,
  key: string,
): Promise<string> => {

  // Convert the IV, ciphertext
  // and key to array buffers
  const ivBuffer = Uint8Array.from(atob(iv), (char) => char.charCodeAt(0));
  const ciphertextBuffer = Uint8Array.from(atob(ciphertext), (char) => char.charCodeAt(0));
  const keyBuffer = Uint8Array.from(atob(key), (char) => char.charCodeAt(0));

  // Import the AES-GCM key buffer
  // to use for decryption
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    {
      name: 'AES-GCM',
    },
    false,
    [
      'encrypt',
      'decrypt',
    ],
  );

  // Decrypt the data using the AES-GCM
  // algorithm, IV and key
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivBuffer,
    },
    cryptoKey,
    ciphertextBuffer,
  );

  // Decode and return the
  // decrypted data
  return new TextDecoder()
    .decode(decryptedBuffer);
};

export default decryptData;
