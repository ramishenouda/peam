import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openFile } from 'services/project-service';

import { CourseState } from 'store/course/types';
import { SystemState } from 'store/system/types';

import { Project } from 'models';

import { Title } from 'components/settings/settings-style';

import { File, Up } from './file';
import { ProjectFiles } from './styles';
import { FileViewer } from './file-viewer';
import { showAxiosResponseErrors } from 'services/error-handler-service';
import { CircleLoader } from 'react-spinners';

type Props = {
  project: Project;
};

interface Params {
  code: string;
  owner: string;
  type: string;
  title_1: string;
  title_2: string;
}

export const Tree = ({ project }: Props) => {
  const params: Params = useParams();

  const systemState: SystemState = useSelector((state: any) => state.system);
  const courseState: CourseState = useSelector((state: any) => state.course);

  const initial: any = {};
  const [viewingFile, setViewingFile] = useState(false); // for file-viewer
  const [data, setData] = useState(''); // for file-viewer
  const [fileName, setFileName] = useState(''); // for file-viewer
  const [currentDir, setCurrentDir] = useState('peam_____root');
  const [directories, setdirectories] = useState(initial);
  const [openingFile, setOpeningFile] = useState(false);

  const directoriesLength = Object.keys(directories).length;

  const openProjectFile = (file_path: string) => {
    setOpeningFile(true);
    file_path = file_path.slice('peam_____root/'.length);
    openFile(
      courseState.owner,
      courseState.code,
      params.title_1,
      params.title_2,
      systemState,
      project.title,
      file_path
    )
      .then((result: any) => {
        setData(result.data.content);
        const lastSlashIndex = file_path.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
          setFileName(file_path.slice(lastSlashIndex + 1));
        } else {
          setFileName(file_path);
        }
        setViewingFile(true);
      })
      .catch((err) => {
        showAxiosResponseErrors(err);
      })
      .finally(() => setOpeningFile(false));
  };

  useEffect(() => {
    setdirectories(structureFiles(project.project_zip.files));
  }, [project.project_zip]);

  const [dir, lastDir] = getDirectoryFiles(directories, currentDir);
  const files = getFiles(
    Object.keys(dir) ? dir : directories,
    setCurrentDir,
    currentDir,
    lastDir,
    openProjectFile
  );

  if (openingFile) {
    return (
      <div className="text-center f1 py-5">
        <p>Opening file...</p>
        <div className="d-flex justify-content-center">
          <CircleLoader loading={openingFile} />
        </div>
      </div>
    );
  }

  if (viewingFile) {
    return (
      <div>
        <FileViewer
          data={data}
          file_name={fileName}
          toggleViewer={() => setViewingFile(false)}
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="text-left f2">
        <Title>{project.title}</Title>
      </div>
      {Object.keys(directories).length && <ProjectFiles>{files}</ProjectFiles>}
      {!directoriesLength && <span>Loading project files....</span>}
    </div>
  );
};

const getFiles = (
  directory: any,
  setCurrentDir: (arg: string) => void,
  currentDir: string,
  lastDir: string,
  openFile: (file_path: string) => void
): JSX.Element[] => {
  if (!Object.keys(directory).length) return [<span></span>];

  if (directory['root']) directory = directory.root;
  let prevDic = '';
  const files: JSX.Element[] = [];
  for (const [key] of Object.entries(directory)) {
    if (typeof directory[key] === 'object') {
      files.push(
        <File
          file_name={key}
          last_index={true}
          key={key + Date()}
          setCurrentDir={setCurrentDir}
          currentDir={currentDir}
          openFile={openFile}
        />
      );
    } else {
      files.push(
        <File
          file_name={directory[key]}
          last_index={true}
          key={directory[key] + Date()}
          setCurrentDir={setCurrentDir}
          currentDir={currentDir}
          openFile={openFile}
        />
      );
    }
  }

  const lastSlash = currentDir.lastIndexOf('/', currentDir.length - 2);
  const _currentDir = currentDir.slice(0, lastSlash);
  if (lastSlash !== -1 && lastDir !== 'peam_____root/') {
    files.unshift(
      <Up
        key={lastSlash + prevDic}
        file_name={lastDir}
        up={() => setCurrentDir(_currentDir)}
      />
    );
  }

  return files;
};

const getDirectoryFiles = (directories: any, directory: string) => {
  const lastSlash = directory.lastIndexOf('/');
  if (lastSlash !== -1) directory = directory.slice(0, lastSlash);

  const dirs = directory
    .split('/')
    .filter((dir) => dir.length)
    .map((dir) => dir + '/');

  const lastDir = !dirs[dirs.length - 1].length
    ? dirs[dirs.length - 2]
    : dirs[dirs.length - 1];
  for (let i = 0; i < dirs.length; i++) {
    if (!dirs[i]) {
      continue;
    }

    if (directories[dirs[i]]) {
      directories = directories[dirs[i]];
    }
  }

  return [directories, lastDir];
};

const structureFiles = (files: string[]): any[] => {
  const result: any = {
    'peam_____root/': [],
  };

  files.forEach((file, i) => {
    const dirs = file.split('/');
    const folder = file[file.length - 1] === '/';
    let temp = result['peam_____root/'];
    for (let i = 0; i < dirs.length; i++) {
      if (!dirs[i].trim().length) continue;
      if (temp[dirs[i] + '/']) temp = temp[dirs[i] + '/'];
      else if (folder) temp[dirs[i] + '/'] = [];

      if (i === dirs.length - 2 && !folder) break;
    }
    if (!folder) temp.push(dirs[dirs.length - 1]);
  });

  return result;
};
