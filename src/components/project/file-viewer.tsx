type Props = {
  file_name: string;
  data: string;
};

export const FileViewer = ({ file_name, data }: Props) => {
  return <div>{data}</div>;
};
