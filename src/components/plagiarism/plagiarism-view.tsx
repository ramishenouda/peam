import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UpIcon from '@material-ui/icons/ArrowBack';

import { SystemState } from 'store/system/types';
import { PlagiarismProject as Project, File } from 'models';

import { DetectPlagiarismForTwoFiles } from 'services/plagiarism-service';

import { VerticalNavbar } from 'components/vertical-navbar/vertical-navbar';
import { GridViewRL } from 'style';
import { PlagiarismFiles } from './plagiarism-files';
import { showAxiosResponseErrors } from 'services/error-handler-service';

type Props = {
  files: Array<string>; // Current project files.
  file: string; // Current projects for the opened file.
  projects: Array<Project>; // projects for the navbar.
  getProjects: (arg: number) => void;
  gettingProjects: boolean;
  projectUid: string; // Current opened team projectUid
};

export const PlagiarismView = ({
  files,
  file,
  projects,
  getProjects,
  gettingProjects,
  projectUid,
}: Props) => {
  const [filesTab, setFilesTab] = useState(-1);
  const [projectsTab, setProjectsTab] = useState(-1);

  const [choosingFile, setChoosingFile] = useState(true); // for choosing a file from the navbar.
  const [choosingProject, setChoosingProject] = useState(false); // for choosing a project from the navbar.
  const [projectFiles, setProjectFiles] = useState(new Array<File>());

  const systemState: SystemState = useSelector((state: any) => state.system);

  useEffect(() => {
    if (filesTab !== -1 && choosingFile) {
      getProjects(filesTab);
      setChoosingFile(false);
      setChoosingProject(true);
    } else if (filesTab === -1 && !choosingFile) {
      setChoosingFile(true);
      setChoosingProject(false);
    }
  }, [filesTab, choosingFile, getProjects]);

  useEffect(() => {
    if (projectsTab === -1 || !projects[projectsTab]) {
      setProjectFiles(new Array<File>());
      return;
    }

    setProjectFiles(projects[projectsTab].files);
  }, [projectsTab, setProjectFiles, projects]);

  const filesTitles = [...files];
  const projectTitles = projects.map((project) => project.projectTitle);

  const up = () => {
    setFilesTab(-1);
    setProjectsTab(-1);
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
      systemState.token,
      '{{',
      '}}'
    );
  };

  const choosingFileNavbar = (
    <VerticalNavbar
      active={filesTab}
      setTab={setFilesTab}
      titles={filesTitles}
    />
  );

  const choosingProjectNavbar = (
    <VerticalNavbar
      active={projectsTab}
      setTab={setProjectsTab}
      titles={projectTitles}
    />
  );

  const filesRenderCondition =
    projectFiles.length !== 0 && file && filesTab !== -1 && projectsTab !== -1;

  return (
    <GridViewRL>
      <div>
        {gettingProjects && (
          <div>
            <div className="f3 font-roboto">
              Loading projects...
              <hr />
            </div>
          </div>
        )}
        {!choosingFile && !gettingProjects && (
          <div className="text-center">
            <div className="f3 font-roboto">
              <span style={{ cursor: 'pointer' }} className="mr-1" onClick={up}>
                <UpIcon />
              </span>
              Choose a project <hr />
            </div>
          </div>
        )}
        {choosingFile && (
          <div className="text-center f3 font-roboto">
            Choose a file <hr />
          </div>
        )}
        {choosingFile && choosingFileNavbar}
        {choosingProject && choosingProjectNavbar}
      </div>
      <div>
        {filesRenderCondition && (
          <PlagiarismFiles
            getPlagForFiles={getPlagForFiles}
            file={file}
            files={projectFiles}
          />
        )}
        {!filesRenderCondition && (
          <div className="f2 text-center pt-5 font-roboto">
            Choose a file and a project from the navbar.
          </div>
        )}
      </div>
    </GridViewRL>
  );
};
