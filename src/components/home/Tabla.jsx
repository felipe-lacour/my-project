import React, { useContext } from 'react';
import Casilla from './Casilla';
import {PartidaContext} from '../../context/partidaContext.js'
import GuardarPartida from './GuardarPartida.jsx';
import IniciarPartida from './IniciarPartida.jsx';

import { TableBody } from './TableBody.jsx';
import { TableHead } from './TableHead.jsx';

export default function Tabla() {

    const {sequence,
        nombres,
        mano,
        generarTablero,
        handleActionComplete,
        handlePuntaje,
        updatePlayerAttribute,
    } = useContext(PartidaContext)

    console.log(sequence)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {!nombres.length ? (
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <IniciarPartida nombres={nombres} generarTablero={generarTablero} updatePlayerAttribute={updatePlayerAttribute}/>
        </div>
      </div>
      ) : (
      <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full pb-2 align-middle sm:px-6 lg:px-8  max-h-[550px] overflow-y-scroll relative">
          <table className="min-w-full divide-y divide-gray-300 pt-0">
              <TableHead nombres={nombres}/>
              <TableBody 
                mano={mano} 
                sequence={sequence} 
                handleActionComplete={handleActionComplete} 
                handlePuntaje={handlePuntaje} 
                Casilla={Casilla}
              />
          </table>
        </div>
      </div>
      <GuardarPartida sequence={sequence}/>
</div>
      )}

      </div>
  );
}
  
  