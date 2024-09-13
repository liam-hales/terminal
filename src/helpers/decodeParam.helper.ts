/**
 * Decodes a given param `value` and
 * check if said value is base64 encoded
 *
 * @param value The value to decode
 * @returns The decoded value
 */
const decodeParam = (value: string): string | undefined => {

  // Define the RegEx for a
  // base64 encoded string
  const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;

  // Test the value against the RegEx, if the test
  // fails then the value is not Base64 encoded
  if (regex.test(value) === false) {
    return;
  }

  // Base64 deocde the
  // value and return it
  return Buffer
    .from(value, 'base64')
    .toString('utf8');
};

export default decodeParam;
