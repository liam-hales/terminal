/**
 * Used to check if a given value is an
 * `AsyncGenerator` and narrow its type
 *
 * @param value The value to check
 */
const isAsyncGenerator = (value: unknown): value is AsyncGenerator => {
  const name = Object.prototype.toString.call(value);
  return name === '[object AsyncGenerator]';
};

export default isAsyncGenerator;
