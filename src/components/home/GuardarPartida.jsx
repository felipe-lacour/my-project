import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useState } from 'react';

export default function GuardarPartida ({sequence}){
    const [saveComplete, setSaveCompleted] = useState(false)

    const handleGuardarPartida = () => {
        const db = getFirestore();
        const playCollection = collection(db, 'partidas')

        addDoc(playCollection,sequence)
            .then(() => {
                setSaveCompleted(true)
            })
    }

    return(      <div className="flex items-center justify-end p-10">
    <div className="mt-4 sm:mt-0 sm:flex-none">
      <button
        type="button"
        className={`block rounded-md ${saveComplete ? `bg-green-600` : `bg-gray-600`} px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        onClick={handleGuardarPartida}
      >
        {saveComplete? 'Partida Guardada':'Guardar Partida'}
      </button>
    </div>
  </div>)
}