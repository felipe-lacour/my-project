import { useContext } from "react";
import { JugadoresContext } from "../../context/jugadoresContext";


function ImageUpload() {
  const {handleUpload, setSelectedFile, setNombre, nombre, selectedFile, uploadProgress, downloadURL} = useContext(JugadoresContext);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };
  return (
    <div>
      <h2>Image Upload</h2>
      <input
        type="text"
        value={nombre}
        onChange={handleNameChange}
        placeholder="Ingrese el nombre"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || !nombre}>
        Upload
      </button>
      {uploadProgress > 0 && (
        <p>Upload progress: {uploadProgress.toFixed(2)}%</p>
      )}
      {downloadURL && (
        <p>
          Download URL: <a href={downloadURL}>{downloadURL}</a>
        </p>
      )}
    </div>
  );
}

export default ImageUpload;


