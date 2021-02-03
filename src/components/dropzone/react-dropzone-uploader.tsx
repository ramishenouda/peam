import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'


import './react-dropzone-uploader-style.css'

export const DropZone = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }: any) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta))
    allFiles.forEach((f: any) => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="*"
    />
  )
}
