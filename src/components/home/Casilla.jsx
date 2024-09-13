import React, { useState } from 'react';
import check from '../../img/check.svg';
import close from '../../img/close.svg';
import SelectorHome from './SelectorHome';

export default function Casilla({ jugador, n, onActionComplete, onPuntaje, index, jugId }) {
  const [puntaje, setPuntaje] = useState();
  const options = Array.from({ length: n + 1 }, (_, index) => index);

  const [selectedValue, setSelectedValue] = useState(0);
  const [jugo, setJugo] = useState(false);

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  const handleCumplir = () => {
    if(!jugo){
        jugador.puntaje += parseInt(selectedValue) * 3 + 10;
        jugador.cumplio.bool = true;
        jugador.cumplio.difer = 0;
    }
    setPuntaje(jugador.puntaje)
    setJugo(true)
    onActionComplete(jugador.id);
    onPuntaje(index, jugId, jugador.puntaje);
  }

  const handleNoCumplir = () => {
    if(!jugo){
        jugador.cumplio.difer = parseInt(prompt("Por cuantas bazas no cumplio?"))
        jugador.puntaje -= jugador.cumplio.difer * 3;
        jugador.cumplio.bool = false;
    }
    setPuntaje(jugador.puntaje)
    setJugo(true)
    onActionComplete(jugador.id);
    onPuntaje(index, jugId, jugador.puntaje);
  }

  return (
    <td className="whitespace-nowrap text-sm font-medium text-gray-900">
      <div className="flex flex-col">
        <div className='text-right p-2 font-semibold'>{jugo? puntaje : jugador.puntaje}</div>
        <div className="flex">
            {jugo ? <div className='w-4 text-center'>{selectedValue}</div> : <SelectorHome options={options} selectedValue={selectedValue} handleChange={handleChange}/>}
          {jugo ? '' :           <button 
            className="bg-green-600 h-6 w-full flex items-center justify-center"
            aria-label="Confirm"
            onClick={handleCumplir}
          >
            <img src={check} alt="check" className='h-4 w-4' />
          </button>}
          {jugo ? '' :
          <button 
            className="bg-red-600 h-6 w-full flex items-center justify-center"
            aria-label="Cancel"
            onClick={handleNoCumplir}
          >
            <img src={close} alt="close" className='h-4 w-4' />
          </button>}
        </div>
      </div>
    </td>
  );
}
