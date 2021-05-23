import { Item, Text } from './styles';
import FolderIcon from '@material-ui/icons/Folder';

import UpIcon from '@material-ui/icons/ArrowBack';
type Props = {
  file_name: string;
  last_index: boolean;
  currentDir: string;
  setCurrentDir: (arg: string) => void;
  openFile: (file_path: string) => void;
};

const onClick = (
  file_name: string,
  currentDir: string,
  setCurrentDir: (arg: string) => void,
  openFile: (file_path: string) => void
) => {
  if (file_name[file_name.length - 1] !== '/') {
    const file_path = `${currentDir}/${file_name}`.replaceAll('//', '/');
    openFile(file_path);
    return;
  }
  setCurrentDir(`${currentDir}/${file_name}`.replaceAll('//', '/'));
};

export const File = ({
  file_name,
  last_index,
  setCurrentDir,
  currentDir,
  openFile,
}: Props) => {
  return (
    <Item
      onClick={() => onClick(file_name, currentDir, setCurrentDir, openFile)}
      className={`${last_index ? 'border-top' : 'border-bottom'}`}
    >
      {file_name[file_name.length - 1] === '/' && (
        <FolderIcon
          className="mb-1"
          style={{ color: '#555', cursor: 'pointer' }}
        />
      )}
      <Text className="disable-link-style ml-1">{file_name}</Text>
    </Item>
  );
};

type Props2 = {
  file_name: string;
  up: (arg?: any) => void;
};

export const Up = ({ file_name, up }: Props2) => {
  return (
    <Item onClick={() => up()} className={'border-bottom'}>
      <UpIcon className="mb-1" style={{ color: '#555', cursor: 'pointer' }} />
      <Text className="disable-link-style ml-1">{file_name}</Text>
    </Item>
  );
};
