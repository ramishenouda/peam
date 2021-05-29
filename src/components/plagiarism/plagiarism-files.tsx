import { useEffect, useState } from 'react';

import { File } from 'models';

import { GridViewEQ } from 'style';
import { showAxiosResponseErrors } from 'services/error-handler-service';

interface Files {
  firstFile: File;
  secondFile: File;
}

type Props = {
  files: Files;
  getPlagForFiles: (firstFile: string, secondFile: string) => Promise<any>;
};

export const PlagiarismFiles = ({ files, getPlagForFiles }: Props) => {
  const [firstFile, setFirstFile] = useState('');
  const [secondFile, setSecondFile] = useState('');
  const [lastSecondFilePath, setLastSecondFilePath] = useState('');
  useEffect(() => {
    if (
      !files.secondFile.filePath ||
      files.secondFile.filePath === lastSecondFilePath
    )
      return;
    console.log(files);
    getPlagForFiles(files.firstFile.filePath, files.secondFile.filePath)
      .then((result) => {
        setFirstFile(result.data.first_file);
        setSecondFile(result.data.second_file);
        setLastSecondFilePath(files.secondFile.filePath);
      })
      .catch((err) => showAxiosResponseErrors(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <GridViewEQ>
      <pre
        className="draggableText"
        dangerouslySetInnerHTML={{ __html: firstFile }}
      />
      <pre
        className="draggableText"
        dangerouslySetInnerHTML={{ __html: secondFile }}
      />
    </GridViewEQ>
  );
};
