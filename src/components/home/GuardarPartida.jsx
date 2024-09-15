import { useContext } from 'react';
import { PartidaContext } from '../../context/partidaContext';

export default function GuardarPartida({ sequence }) {
  const {saveComplete, handleGuardarPartida} = useContext(PartidaContext);

  return (
    <div className="flex items-center justify-end p-10">
      <div className="mt-4 sm:mt-0 sm:flex-none">
        <button
          type="button"
          className={`block rounded-md ${saveComplete ? `bg-green-600` : `bg-gray-600 hover:bg-gray-500`} px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
          onClick={() => handleGuardarPartida(sequence)}
        >
          {saveComplete ? 'Partida Guardada' : 'Guardar Partida'}
        </button>
      </div>
    </div>
  );
}
