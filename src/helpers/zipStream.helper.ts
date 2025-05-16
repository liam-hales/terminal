import { AsyncZipDeflate, Zip } from 'fflate';

/**
 * Used to compress given file(s) into a
 * `.zip` archive data stream
 *
 * @param files The files to compress
 * @param onProgress The function used to update the progress
 *
 * @returns A readable `.zip` archive stream
 */
const zipStream = (files: File[], onProgress?: (percentage: number) => void): ReadableStream => {
  const totalBytes = files.reduce((total, file) => total + file.size, 0);
  let processedBytes = 0;

  return new ReadableStream({
    start: async function (controller) {

      // Create the new zip archive
      // used to compress files
      const zip = new Zip((error, chunk, final) => {

        // If there was an error then
        // abort the stream
        if (error != null) {
          controller.error(error);
          return;
        }

        // Add the chunk to the
        // stream controller
        controller.enqueue(chunk);

        // If it's the final chunk to process
        // then close the stream
        if (final === true) {
          controller.close();
        }
      });

      // Loop through the files and add each one to the archive
      // Processing the files sequentially helps to stop the main thread from being blocked
      for (const file of files) {
        const deflate = new AsyncZipDeflate(file.name, {
          level: 6,
        });

        // Add the deflate stream to the zip archive
        // before reading the file stream
        zip.add(deflate);

        const reader = file
          .stream()
          .getReader();

        // Read the file stream and push all
        // the data to the deflate stream
        while (true) {
          const { value, done } = await reader.read();
          if (done === true) {
            break;
          }

          // Update the processed bytes and pass the
          // percentage to the `onProgress` function
          processedBytes = processedBytes + value.byteLength;
          onProgress?.((100 / totalBytes) * processedBytes);

          // Add the value to the deflate stream
          deflate.push(value, false);
        }

        // Add an empty `Uint8Array` as the
        // final chunk of data
        deflate.push(new Uint8Array(0), true);
      }

      // Finalise the zip archive
      zip.end();
    },
  });
};

export default zipStream;
