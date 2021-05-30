import {
  text,
  image,
  availableExtensions,
  extensionToFullName,
} from 'helpers/types';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Up } from './file';

type Props = {
  file_name: string;
  data: string;
  toggleViewer: (arg: boolean) => void;
};

export const FileViewer = ({ file_name, data, toggleViewer }: Props) => {
  const screenWidth = window.innerWidth;
  const type = file_name.slice(file_name.lastIndexOf('.') + 1);
  let file: any = data;
  if (image.includes(type)) {
    const image = new Image();
    image.src = 'data:image/jpg;base64,' + data;

    file = (
      <div className="text-center p-0 m-0">
        <img
          style={{ maxWidth: screenWidth - 40 + 'px' }}
          src={'data:image/jpg;base64,' + data}
          alt={file_name}
        />
      </div>
    );
  }

  const language = extensionToFullName(type);

  // fix: check if the data is not null
  // test:
  if (text.includes(type) && data) {
    file =
      data.length && type && availableExtensions.includes(type) ? (
        <SyntaxHighlighter language={language} style={docco}>
          {data}
        </SyntaxHighlighter>
      ) : (
        <span>
          {availableExtensions.includes(type) && <>File is empty.</>}
          {!availableExtensions.includes(type) && (
            <> Unsupported media type. </>
          )}
        </span>
      );
  }

  return (
    <div>
      <Up file_name={file_name} up={toggleViewer} />
      <div className="mt-2"> {file} </div>
    </div>
  );
};
