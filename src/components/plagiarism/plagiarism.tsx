import { useEffect, useState } from 'react';

import {
  PlagiarismData as plagiarism,
  PlagiarismProject as Project,
  File,
} from 'models';
import { PlagiarismView } from './plagiarism-view';

type Props = {
  plagiarismData: Array<plagiarism>;
  ratio: number;
  projectUid: string;
};

const Plagiarism = ({ plagiarismData, ratio, projectUid }: Props) => {
  const [gettingProjects, setGettingProjects] = useState(false); // for fetching
  const [noPlagiarismData, setNoPlagiarismData] = useState(false);

  const [numberOfMatches, setNumberOfMatches] = useState(0);

  const [files, setFiles] = useState(new Array<string>()); // Current opened project files for navbar.
  const [file, setFile] = useState({} as File); // current chose team file from the navbar
  const [projects, setProjects] = useState(new Array<Project>()); // Projects for navbar

  const getProjects = (index: number, file: string) => {
    const plagData = plagiarismData.filter((_file) => _file.file === file)[0];
    if (!plagData) return;
    setGettingProjects(true);
    getProjectsData(plagData)
      .then((result) => {
        setProjects(result);
      })
      .finally(() => {
        setGettingProjects(false);
        const file = plagData.file;
        setFile({ file: file, filePath: file, ratio: file });
      });
  };

  useEffect(() => {
    if (!plagiarismData) {
      setNoPlagiarismData(true);
      return;
    }
    const files = plagiarismData.map((f) => f.file);
    setFiles(files);
    setNumberOfMatches(getNumberOfMatches(plagiarismData));
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
      numberOfMatches={numberOfMatches}
      file={file}
      projects={projects}
      gettingProjects={gettingProjects}
      projectUid={projectUid}
      ratio={ratio}
    />
  );
};

const getProjectsData = async (
  plagiarismData: plagiarism
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

const getNumberOfMatches = (plagiarismData: Array<plagiarism>): number => {
  return plagiarismData.length;
};

Plagiarism.defaultProps = {
  failures: [],
  file: '',
  matches: [],
  project: '',
};

export default Plagiarism;
