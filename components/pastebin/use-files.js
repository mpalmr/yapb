import { useState } from 'react';


function createFile() {
  return {
    contents: '',
  };
}


export default function useFiles() {
  const [files, setFiles] = useState([createFile()]);

  return {
    files,

    addFile() {
      setFiles(files.concat(createFile()));
    },

    removeFile(index) {
      setFiles(files.filter((_, i) => i !== index));
    },
  };
}
