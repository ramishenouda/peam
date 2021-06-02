import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from 'react-bootstrap';

type Props = {
  text: string;
  toggleText?: string;
  setFormData: (arg: FormData) => void;
  formDataHeader: string;
  uploading: boolean;
};

const UploadZone = ({
  text,
  toggleText,
  formDataHeader,
  setFormData,
  uploading,
}: Props) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ multiple: false, maxFiles: 1, accept: '.zip' });
  const [toggleUploader, setToggleUploader] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    if (!hasFile) {
      setFormData(new FormData());
      return;
    }

    const formData = new FormData();
    formData.append(formDataHeader, acceptedFiles[0]);
    setFormData(formData);
  }, [hasFile]); // eslint-disable-line react-hooks/exhaustive-deps

  if (acceptedFiles.length && !hasFile) {
    setHasFile(true);
  }

  if (toggleUploader && !hasFile) {
    return (
      <Button
        className="drop-zone shadow-none w-100 text-black"
        variant="light"
        {...getRootProps()}
      >
        <input readOnly={uploading} {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here</p>
        ) : (
          <p>Drag and drop the zip file, or click to select it.</p>
        )}
      </Button>
    );
  }

  if (hasFile) {
    const file: File = acceptedFiles[0];

    return (
      <Button
        disabled={uploading}
        onClick={() => {
          acceptedFiles.length = 0;
          setHasFile(false);
        }}
        className="drop-zone shadow-none w-100 text-black"
        key={file.name}
        variant="light"
      >
        {file.name} - {(file.size / 1000 / 1000).toFixed(2)} mb
        <p className="text-black f3">Click to choose another file.</p>
      </Button>
    );
  }

  return (
    <div>
      <Button
        onClick={() => setToggleUploader(true)}
        className="drop-zone shadow-none w-100 text-black"
        variant="light"
      >
        {text} <br /> {toggleText && ''}
      </Button>
    </div>
  );
};

export default UploadZone;
