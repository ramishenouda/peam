import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UpIcon from '@material-ui/icons/ArrowBack';

import { SystemState } from 'store/system/types';
import { PlagiarismProject as Project, File } from 'models';

import { DetectPlagiarismForTwoFiles } from 'services/plagiarism-service';

import { VerticalNavbar } from 'components/vertical-navbar/vertical-navbar';
import { GridViewRL, Title } from 'style';
import { PlagiarismFiles } from './plagiarism-files';

type Props = {
  files: Array<string>; // Current project files.
  file: File; // Current projects for the opened file.
  projects: Array<Project>; // projects for the navbar.
  getProjects: (arg: number, file: string) => void;
  gettingProjects: boolean;
  projectUid: string; // Current opened team projectUid
  numberOfMatches: number;
  ratio: number;
};

function getFilesTitles(files: string[]): string[] {
  const directories = Array.from(
    new Set(
      files
        .filter((file) => file.lastIndexOf('/') !== -1)
        .map((file) => file.slice(0, file.lastIndexOf('/') + 1))
    )
  );

  const _files = files.filter((file) => file.indexOf('/') === -1);

  const filesInsideDirectories = directories.map((dir: string) => {
    const dicFiles = files
      .filter((file) => {
        if (
          file.length < dir.length ||
          file.slice(dir.length + 1).indexOf('/') !== -1
        )
          return false;
        const fileDir = file.slice(0, dir.length);
        if (fileDir === dir) return true;
        return false;
      })
      .map((file) => file.slice(dir.length));

    return [dir + '[[title]]', ...dicFiles];
  });

  const titles = [..._files];
  filesInsideDirectories.map((d) => d.map((f) => titles.push(f)));

  return titles;
}

const getFileName = (
  teamProjectFiles: Array<string>,
  index: number
): string => {
  if (index < 0 || index >= teamProjectFiles.length) return teamProjectFiles[0];

  let result = teamProjectFiles[index];
  const length = '[[title]]'.length;

  for (let i = index; i > -1; i--) {
    const title = teamProjectFiles[i];
    if (title.indexOf('[[title]]') === -1) continue;
    return title.slice(0, title.length - length) + teamProjectFiles[index];
  }

  return result;
};

export const PlagiarismView = ({
  files,
  file,
  projects,
  getProjects,
  gettingProjects,
  numberOfMatches,
  ratio,
  projectUid,
}: Props) => {
  const [filesTab, setFilesTab] = useState(-1);
  const [projectsTab, setProjectsTab] = useState(-1);
  const [filesProjectsTab, setFilesProjectsTab] = useState(-1);

  const [teamProjectFiles, setTeamProjectFiles] = useState(new Array<string>());
  const [choosingFile, setChoosingFile] = useState(true); // for choosing a file from the navbar.

  const [choosingProject, setChoosingProject] = useState(false); // for choosing a project from the navbar.
  const [choosingProjectFile, setChoosingProjectFile] = useState(false); // for choosing a project file from the navbar.

  const [projectFiles, setProjectFiles] = useState(new Array<File>()); // for storing chosed project files.
  const [projectFilesTitles, setProjectFilesTitles] = useState(
    new Array<string>()
  ); // to convert chosed project files to title for the navbar.
  const [chosenProjectFile, setChosenProjectFile] = useState({} as File);

  const [showNavbar, setShowNavbar] = useState(true);

  const systemState: SystemState = useSelector((state: any) => state.system);

  useEffect(() => {
    setTeamProjectFiles(getFilesTitles(files));
  }, [files]);

  useEffect(() => {
    if (filesTab !== -1 && choosingFile) {
      getProjects(filesTab, getFileName(teamProjectFiles, filesTab));
      setChoosingFile(false);
      setChoosingProject(true);
    } else if (filesTab === -1 && !choosingFile) {
      setChoosingFile(true);
      setChoosingProject(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesTab]);

  useEffect(() => {
    if (projectsTab === -1 || !projects[projectsTab]) {
      setProjectFiles(new Array<File>());
      if (choosingProjectFile) {
        setChoosingProjectFile(false);
        setChoosingProject(true);
      }
      return;
    }

    setChoosingProjectFile(true);
    setChoosingProject(false);

    setProjectFiles(projects[projectsTab].files);
    setProjectFilesTitles(
      getFilesTitles(projects[projectsTab].files.map((f) => f.file))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsTab, projects]);

  useEffect(() => {
    if (filesProjectsTab === -1) {
      setChosenProjectFile({} as File);
      return;
    }
    setChosenProjectFile(projectFiles[filesProjectsTab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesProjectsTab]);
  const projectTitles = projects.map((project) => project.projectTitle);

  const up = () => {
    if (!choosingProject && !choosingFile) {
      setProjectsTab(-1);
      setFilesProjectsTab(-1);
      return;
    }

    setFilesTab(-1);
    setProjectsTab(-1);
    setFilesProjectsTab(-1);
  };

  const getPlagForFiles = (
    firstFile: string,
    secondFile: string
  ): Promise<{}> => {
    return DetectPlagiarismForTwoFiles(
      projectUid,
      projects[projectsTab].project,
      firstFile,
      secondFile,
      systemState.token
    );
  };

  const toggleCallBack = (arg: boolean) => {
    setShowNavbar(arg);
  };

  let verticalNavbarHeader;
  if (showNavbar) {
    if (gettingProjects) {
      verticalNavbarHeader = (
        <div>
          <div className="f3 font-roboto">
            Loading projects...
            <hr />
          </div>
        </div>
      );
    } else if (!choosingFile && !gettingProjects) {
      verticalNavbarHeader = (
        <div className="text-center">
          <div className="f3 font-roboto">
            <span style={{ cursor: 'pointer' }} className="mr-1" onClick={up}>
              <UpIcon />
            </span>
            Choose a project <hr />
          </div>
        </div>
      );
    } else if (choosingFile) {
      verticalNavbarHeader = (
        <div className="text-center card-title pt-2 pb-2 border-bottom f3 font-roboto">
          Choose a file
        </div>
      );
    }
  }

  const choosingFileNavbar = (
    <VerticalNavbar
      active={filesTab}
      setTab={setFilesTab}
      titles={teamProjectFiles}
      emptyTitlesText={'No plagiarism.'}
      showToggleButton={true}
      toggleCallBack={toggleCallBack}
      defaultOpen={true}
      navOptions={'card'}
      navItemContainerOptions={'text-left'}
      navItemOptions={'py-2 my-1'}
      header={verticalNavbarHeader}
      countTitles={true}
    />
  );

  const choosingProjectNavbar = (
    <VerticalNavbar
      active={projectsTab}
      setTab={setProjectsTab}
      titles={projectTitles}
      emptyTitlesText={'All good here.'}
      showToggleButton={true}
      toggleCallBack={toggleCallBack}
      defaultOpen={true}
      navOptions={'card'}
      navItemContainerOptions={'text-left'}
      navItemOptions={'py-2 my-1'}
      header={verticalNavbarHeader}
    />
  );

  const choosingProjectFileNavbar = (
    <VerticalNavbar
      active={filesProjectsTab}
      setTab={setFilesProjectsTab}
      titles={projectFilesTitles}
      emptyTitlesText={'All good here.'}
      showToggleButton={true}
      toggleCallBack={toggleCallBack}
      defaultOpen={true}
      navOptions={'card'}
      navItemContainerOptions={'text-left'}
      navItemOptions={'py-2 my-1'}
      header={verticalNavbarHeader}
    />
  );

  let textStyle = '';
  if (ratio < 0.31) {
    textStyle = 'text-success';
  } else if (ratio < 0.51) {
    textStyle = 'text-warning';
  } else {
    textStyle = 'text-danger';
  }

  const filesRenderCondition =
    projectFiles.length !== 0 && file && filesTab !== -1 && projectsTab !== -1;

  const choosingAFileCondition =
    (!filesRenderCondition && choosingFile) || !chosenProjectFile.filePath;
  const noMatchesForFileCondition = !projectTitles.length && !choosingFile;

  return (
    <GridViewRL hidden={!showNavbar}>
      <div>
        {choosingFile && choosingFileNavbar}
        {choosingProject && choosingProjectNavbar}
        {choosingProjectFile && choosingProjectFileNavbar}
      </div>
      <div>
        {filesRenderCondition && chosenProjectFile.filePath && (
          <PlagiarismFiles
            getPlagForFiles={getPlagForFiles}
            files={{ firstFile: file, secondFile: chosenProjectFile }}
          />
        )}
        {choosingAFileCondition && !noMatchesForFileCondition && (
          <div className="mt-2 pt-2">
            <div className="text-center font-roboto f2 py-5 mt-5 rounded">
              {/* <Title className="f1 text-primary">Plagiarism detected</Title>
              <hr style={{ width: '150px', margin: '0 auto' }} />
              <p>
                <span className="f3 font-roboto mr-3 border-right pr-4">
                  Found {numberOfMatches} files
                </span>
                <span className="ml-3 f3 font-roboto">
                  Ratio {Math.floor(ratio * 100)}%
                </span>
              </p> */}

              <Title className={`f1 ${textStyle}`}>
                {Math.floor(ratio * 100)}% Plagiarism detected
              </Title>
              <p className="f3 font-roboto">
                Found {numberOfMatches} files with plagiarism
              </p>
            </div>
          </div>
        )}
        {noMatchesForFileCondition && (
          <div className="rounded bg-light py-5 text-center mt-5 font-roboto f2">
            Looks like this file has no plagiarisms matches with other projects.
          </div>
        )}
      </div>
    </GridViewRL>
  );
};
