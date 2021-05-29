import React, { useEffect, useState } from 'react';

import { File } from 'models';

import { CodeEditor, GridViewEQ } from 'style';
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
  const [firstFileLines, setFirstFileLines] = useState(0);
  const [firstFileSize, setFirstFileSize] = useState('');
  const [secondFile, setSecondFile] = useState('');
  const [secondFileLines, setSecondFileLines] = useState(0);
  const [secondFileSize, setSecondFileSize] = useState('');
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
        let first: string = result.data.first_file;
        // '<li>' + result.data.first_file.replaceAll('\n', '</li> <li>');
        let second: string = result.data.second_file;
        //'<li>' + result.data.second_file.replaceAll('\n', '</li> <li>');

        let firstResult = "<span class='line-number'> 1 </span>";
        let secondResult = "<span class='line-number'> 1 </span>";
        for (let i = 0, index = 2; i < first.length; i++) {
          if (first[i] === '\n') {
            firstResult += `\n<span class='line-number'> ${index++} </span>`;
            continue;
          }
          firstResult += first[i];
        }

        for (let i = 0, index = 2; i < second.length; i++) {
          if (second[i] === '\n') {
            secondResult += `\n<span class='line-number'> ${index++} </span>`;
            continue;
          }
          secondResult += first[i];
        }

        setFirstFileLines(result.data.first_file.split('\n').length);
        setSecondFileLines(result.data.second_file.split('\n').length);
        setFirstFile(firstResult);
        setSecondFile(secondResult);
        setFirstFileSize(
          (new Blob([result.data.first_file]).size / 1000).toFixed(2)
        );
        setSecondFileSize(
          (new Blob([result.data.second_file]).size / 1000).toFixed(2)
        );
        setLastSecondFilePath(files.secondFile.filePath);
      })
      .catch((err) => showAxiosResponseErrors(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div>
      <div className="text-right text-muted font-roboto f6 pr-4">
        Plagiarism ratio: {parseFloat(files.secondFile.ratio) * 100}%
      </div>
      <GridViewEQ className="f4">
        <div>
          <div className="text-muted f6 font-roboto">
            <span className="border-muted border-right mr-1 pr-1">
              {firstFileLines} lines
            </span>
            {firstFileSize} kb
          </div>
          <CodeEditor
            className="draggableText pt-1"
            dangerouslySetInnerHTML={{ __html: firstFile }}
          />
        </div>
        <div>
          <div className="text-muted f6 font-roboto">
            <span className="border-muted  border-right mr-1 pr-1">
              {secondFileLines} lines
            </span>
            {secondFileSize} kb
          </div>
          <CodeEditor
            className="draggableText pt-1"
            dangerouslySetInnerHTML={{ __html: secondFile }}
          />
        </div>
      </GridViewEQ>
    </div>
  );
};
