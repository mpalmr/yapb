import { useState } from 'react';
import uuid from 'uuid/v4';


function createFile() {
  return {
    id: uuid(),
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

    createFileHandlers(fileIndex) {
      return {
        remove() {
          setFiles(files.filter((_, i) => i !== fileIndex));
        },

        setContents(value) {
          setFiles(files.map((file, i) => (i !== fileIndex ? file : {
            ...file,
            contents: value,
          })));
        },
      };
    },
  };
}
