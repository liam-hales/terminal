/**
 * Used to select a single or multiple files
 * using a dummy `input` element
 *
 * @returns The selected file(s)
 */
const selectFiles = async (): Promise<File[]> => {
  return new Promise<File[]>((resolve, reject) => {

    // Create a hidden input element so the
    // user can select file(s) to upload
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    // Add the `change` event listener for when
    // the user selects files
    input.addEventListener('change', () => {
      const { files } = input;

      // Resolve the files once checked
      // to make sure they exist
      if (files != null) {
        resolve(Array.from(files));
      }

      reject(
        new Error('An error occurred selecting file(s)'),
      );
    });

    // Add the `cancel` event listener for when the user closes
    // the file select window without selecting any files
    input.addEventListener('cancel', () => {
      reject(
        new Error('Cancelled, no file(s) selected'),
      );
    });

    input.click();
  });
};

export default selectFiles;
