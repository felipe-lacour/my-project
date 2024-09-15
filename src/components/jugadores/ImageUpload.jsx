import { useContext } from "react";
import { JugadoresContext } from "../../context/jugadoresContext";


function ImageUpload() {
  const {handleUpload, setSelectedFile, setNombre, nombre, selectedFile, uploadProgress} = useContext(JugadoresContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Agregar Jugador</h2>
      <div className="w-1/3 border bg-gray-100 rounded-lg p-2 mt-3 flex flex-col gap-6">
        <div>
        <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={nombre}
          onChange={handleNameChange}
          placeholder="Ingrese el nombre"
          className="w-full block rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        </div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile || !nombre} 
          className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Agregar
        </button>
        {uploadProgress > 0 && (
          <p>Upload progress: {uploadProgress.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;


