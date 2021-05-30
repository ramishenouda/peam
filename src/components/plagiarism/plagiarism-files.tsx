import React, { useEffect, useState } from 'react';

import { File } from 'models';

import { CodeEditor, GridViewEQ, ClearDiv } from 'style';
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
        let second: string = result.data.second_file;
        let index = 0;

        let firstResult: any = first.split('\n');
        setFirstFileLines(firstResult.length);
        firstResult =
          '<table> ' +
          firstResult
            .map((line: string) => {
              return `<tr><td class="line-number text-right"> ${index++} </td> <td class="line-text">${line}</td></tr>`;
            })
            .join('') +
          '</table>';

        index = 0;
        let secondResult: any = second.split('\n');
        setSecondFileLines(secondResult.length);
        secondResult =
          '<table>' +
          secondResult
            .map((line: string) => {
              return `<tr><td class="line-number text-right"> ${index++} </td> <td class="line-text">${line}</td></tr>`;
            })
            .join('') +
          '</table>';

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
    <div className="bg-code-editor card">
      <div className="text-right text-dark font-roboto f5 pt-2 pr-4">
        Plagiarism ratio: {parseFloat(files.secondFile.ratio) * 100}%
      </div>
      <GridViewEQ className="f4">
        <div className="card shadow-sm">
          <ClearDiv className="text-white f6 font-roboto card-title bg-g-dark px-2 py-2">
            <div className="border-muted float-left mr-1 pr-1">
              {files.firstFile.file}
            </div>
            <div className="float-right">
              <span className="border-muted border-right mr-1 pr-1">
                {firstFileLines} lines
              </span>
              {firstFileSize} kb
            </div>
          </ClearDiv>
          <CodeEditor
            className="draggableText pt-1"
            dangerouslySetInnerHTML={{ __html: firstFile }}
          />
        </div>
        <div className="card shadow-sm">
          <ClearDiv className="text-white f6 font-roboto card-title bg-g-dark px-2 py-2 ">
            <div className="border-muted float-left mr-1 pr-1">
              {files.secondFile.file}
            </div>
            <div className="float-right">
              <span className="border-muted  border-right mr-1 pr-1">
                {secondFileLines} lines
              </span>
              {secondFileSize} kb
            </div>
          </ClearDiv>
          <CodeEditor
            className="draggableText pt-1"
            dangerouslySetInnerHTML={{ __html: secondFile }}
          />
        </div>
      </GridViewEQ>
    </div>
  );
};
