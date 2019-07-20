import { useState } from 'react';
import uuid from 'uuid/v4';


function createFile() {
  return {
    id: uuid(),
    name: '',
    contents: '',
  };
}


export default function useFiles() {
  const [files, setFiles] = useState([createFile()]);


  function createFileHandlers(fileIndex) {
    function createValueSetter(key) {
      return (value) => {
        setFiles(files.map((file, i) => (i !== fileIndex ? file : {
          ...file,
          [key]: value,
        })));
      };
    }

    return {
      setName: createValueSetter('name'),
      setContents: createValueSetter('contents'),

      remove() {
        setFiles(files.filter((_, i) => i !== fileIndex));
      },
    };
  }


  return {
    files: files.map((file, i) => ({ ...file, ...createFileHandlers(i) })),

    addFile() {
      setFiles(files.concat(createFile()));
    },
  };
}
