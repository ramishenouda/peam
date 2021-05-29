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

function getFilesTitles(files: string[]) {
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

const Plagiarism = ({ plagiarismData, projectUid }: Props) => {
  const [gettingProjects, setGettingProjects] = useState(false); // for fetching
  const [noPlagiarismData, setNoPlagiarismData] = useState(false);

  const [files, setFiles] = useState(new Array<string>()); // Current opened project files for navbar.
  const [file, setFile] = useState('');
  const [projects, setProjects] = useState(new Array<Project>()); // Projects for navbar

  const getProjects = (index: number) => {
    setGettingProjects(true);
    getProjectsData(plagiarismData[index])
      .then((result) => {
        setProjects(result);
      })
      .finally(() => {
        setGettingProjects(false);
        setFile(plagiarismData[index].file);
      });
  };

  useEffect(() => {
    if (!plagiarismData.length) {
      setNoPlagiarismData(true);
      return;
    }
    const files = plagiarismData.map((f) => f.file);
    setFiles(getFilesTitles(files));
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
