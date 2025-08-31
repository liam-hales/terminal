import { FunctionComponent, ReactElement, Fragment } from 'react';
import { BaseProps } from '../types';

/**
 * The `FileUploadFeature` component props
 */
interface Props extends BaseProps {
  readonly files: {
    readonly name: string;
    readonly size: number;
    readonly contentType: string;
    readonly url: string;
  }[];
}

/**
 * Used to render the output UI
 * for the file upload feature
 *
 * @param props The component props
 * @returns The `FileUploadFeature` component
 */
const FileUploadFeature: FunctionComponent<Props> = ({ files }): ReactElement<Props> => {

  // Define all the possible file size
  // units that each file could be
  const fileSizeUnits = [
    'bytes',
    'KB',
    'MB',
    'GB',
  ];

  return (
    <Fragment>
      <div className="flex flex-col gap-y-8 pt-4">
        {
          files.map((file) => {
            const { name, size, contentType, url } = file;
            const extension = `.${
              name
                .split('.')
                .pop() ?? ''
            }`;

            const sizeUnitIndex = Math.floor(Math.log(size) / Math.log(1024));
            const sizeValue = size / Math.pow(1024, sizeUnitIndex);

            return (
              <div
                className="flex flex-col gap-y-1"
                key={`file-${name}`}
              >
                <div className="flex flex-row">
                  <p className="min-w-36 max-w-36 font-mono text-sm text-white">
                    Name
                  </p>
                  <p className="font-mono text-sm text-blue-300">
                    {name}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="min-w-36 max-w-36 font-mono text-sm text-white">
                    Size
                  </p>
                  <p className="font-mono text-sm text-blue-300">
                    {`${sizeValue.toFixed(2)} ${fileSizeUnits[sizeUnitIndex]}`}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="min-w-36 max-w-36 font-mono text-sm text-white">
                    Type
                  </p>
                  <p className="font-mono text-sm text-blue-300">
                    {`${extension} (${contentType})`}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="min-w-36 max-w-36 font-mono text-sm text-white">
                    Download URL
                  </p>
                  <p className="font-mono text-sm text-blue-300">
                    {url}
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    </Fragment>
  );
};

export default FileUploadFeature;
