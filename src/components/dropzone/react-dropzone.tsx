import { useMemo } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '30px 20px 20px 20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#ccc',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#a1a1a1',
  fontSize: '18px',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const DropZone = () => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone();

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  const files = acceptedFiles.map((file: FileWithPath) => { return (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  )});

  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
