import { useEffect, useState } from 'react';

import { File } from 'models';

import { PlagiarismFile } from './plagiarism-file';

type Props = {
  files: Array<File>;
  file: string;
  getPlagForFiles: (firstFile: string, secondFile: string) => Promise<any>;
};

interface Files {
  firstFile: string;
  secondFile: string;
}

export const PlagiarismFiles = ({ file, files, getPlagForFiles }: Props) => {
  const [plagiarismFiles, setPlagiarismFiles] = useState(new Array<Files>());
  const [data, setData] = useState(new Array<JSX.Element>());

  const convertFiles = (firstString: string, secondString: string): Files => {
    const matchStart = "<span class='plagiarism-text'>";
    const matchEnd = '</span>';
    return {
      firstFile: firstString
        .replaceAll('{{', matchStart)
        .replaceAll('}}', matchEnd),
      secondFile: secondString
        .replaceAll('{{', matchStart)
        .replaceAll('}}', matchEnd),
    };
  };

  const setView = () => {
    const view = plagiarismFiles
      .slice(data.length)
      .map((file, index) => (
        <PlagiarismFile
          key={index + Date() + file.firstFile.length + file.secondFile.length}
          firstFile={file.firstFile}
          secondFile={file.secondFile}
        />
      ));

    setData([...data, ...view]);
  };

  useEffect(() => {
    setData([]);

    getPlagForFiles(file, files[0].file)
      .then((result: any) => {
        const data: Files = convertFiles(
          result.data.first_file,
          result.data.second_file
        );
        setPlagiarismFiles([data]);
      })
      .catch((err) => {});
  }, [file, files]);

  useEffect(() => {
    if (!plagiarismFiles.length) return;

    setView();
  }, [plagiarismFiles]);

  return <div>{data}</div>;
};
