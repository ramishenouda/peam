import { useEffect, useState } from 'react';

import {
  Plagiarism as plagiarsm,
  PlagiarismProject as Project,
  File,
} from 'models';
import { PlagiarismView } from './plagiarism-view';

type Props = {
  plagiarismData: Array<plagiarsm>;
  projectUid: string;
};

const Plagiarism = ({ plagiarismData, projectUid }: Props) => {
  const [gettingProjects, setGettingProjects] = useState(false); // for fetching
  const [noPlagiarismData, setNoPlagiarismData] = useState(false);

  const [files, setFiles] = useState(new Array<string>()); // Current opened project files for navbar.
  const [file, setFile] = useState({} as File); // current chose team file from the navbar
  const [projects, setProjects] = useState(new Array<Project>()); // Projects for navbar

  const getProjects = (index: number) => {
    if (!plagiarismData[index]) return;
    setGettingProjects(true);
    getProjectsData(plagiarismData[index])
      .then((result) => {
        setProjects(result);
      })
      .finally(() => {
        setGettingProjects(false);
        const file = plagiarismData[index].file;
        setFile({ file: file, filePath: file, ratio: file });
      });
  };

  useEffect(() => {
    if (!plagiarismData.length) {
      setNoPlagiarismData(true);
      return;
    }
    const files = plagiarismData.map((f) => f.file);
    setFiles(files);
  }, [plagiarismData]);

  if (noPlagiarismData) {
    return (
      <div className="text-center mt-5 f1 font-roboto">
        No plagiarism detected.
      </div>
    );
  }

  return (
    <PlagiarismView
      getProjects={getProjects}
      files={files}
      file={file}
      projects={projects}
      gettingProjects={gettingProjects}
      projectUid={projectUid}
    />
  );
};

const getProjectsData = async (
  plagiarismData: plagiarsm
): Promise<Array<Project>> => {
  let prevTitle = '';
  const projects: Project[] = plagiarismData.matches
    .filter((m) => {
      if (m.project !== prevTitle) {
        prevTitle = m.project;
        return true;
      }
      return false;
    })
    .map((p) => {
      return {
        files: [],
        project: p.project,
        projectTitle: p.project_title,
      };
    })
    .map((p) => {
      const files = plagiarismData.matches.filter((m) => {
        return m.project === p.project;
      });

      const projectFiles: File[] = files.map((f) => {
        return {
          file: f.file,
          ratio: f.ratio,
          filePath: f.file,
        };
      });

      return {
        files: projectFiles,
        project: p.project,
        projectTitle: p.projectTitle,
      };
    });

  return projects;
};

Plagiarism.defaultProps = {
  failures: [],
  file: '',
  matches: [],
  project: '',
};

export default Plagiarism;
