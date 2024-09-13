import React, { useEffect, useContext } from 'react';
import Casilla from './Casilla';
import {PartidaContext} from '../../context/partidaContext.js'
import GuardarPartida from './GuardarPartida.jsx';

export default function Tabla() {
    const {sequence,
        nombres,
        mano,
        generarTablero,
        handleActionComplete,
        handlePuntaje
    } = useContext(PartidaContext)

  useEffect(() => {
    generarTablero(nombres);
    // eslint-disable-next-line
  }, [nombres]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => {console.log(sequence)}}
          >
            Iniciar Partida
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr className="divide-x divide-gray-200">
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        N
                    </th>
                    {nombres.map((i) => (
                        <th key={i.id} scope="col" className="py-3.5 ml-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                        {i.nombre}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {Array.from({ length: mano }).map((_, index) => (
                        <tr key={index} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                            {/* Add a check to ensure `manos` exists and has data */}
                            {sequence.manos && sequence.manos[index] ? sequence.manos[index].numero : "N/A"}
                        </td>
                        {/* Ensure sequence.manos[index] and sequence.manos[index].jugadores exist */}
                        {sequence.manos && sequence.manos[index] && sequence.manos[index].jugadores
                            ? sequence.manos[index].jugadores.map((i) => (
                            <Casilla
                                key={i.id}
                                jugador={i}
                                n={sequence.manos[index].numero}
                                onActionComplete={handleActionComplete}
                                onPuntaje={handlePuntaje}
                                index={index}
                                jugId={i.id}
                            />
                            ))
                            : <td className="py-4">No data available</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
        <GuardarPartida sequence={sequence}/>
    </div>
  );
}
  
  