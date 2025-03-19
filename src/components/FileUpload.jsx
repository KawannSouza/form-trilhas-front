import { useState } from "react"

const FileUpload = ({ onFileSelect }) => {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    }
    
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
          setFile(droppedFile);
          onFileSelect(droppedFile);
        }
      };
    
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          setFile(selectedFile);
          onFileSelect(selectedFile);
        }
      };

      return (
        <div className="flex flex-col items-center gap-4">
          <div
            className={`border-2 border-dashed rounded-2xl p-8 w-64 text-center ${dragging ? 'bg-gray-200' : 'bg-gray-100'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? file.name : 'Arraste o arquivo aqui ou clique para selecionar'}
          </div>
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-blue-600"
          >
            Selecionar Arquivo
          </label>
        </div>
      );
}

export default FileUpload;