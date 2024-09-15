import React, { useContext, useState } from 'react';
import check from '../../img/check.svg';
import close from '../../img/close.svg';
import SelectorHome from './SelectorHome';
import { PartidaContext } from '../../context/partidaContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Casilla({ jugador, n, onActionComplete, onPuntaje, index, jugId, reparte }) {
  const [puntaje, setPuntaje] = useState();
  const options = Array.from({ length: n + 1 }, (_, index) => index);
  const [selectedValue, setSelectedValue] = useState(0);
  const [jugo, setJugo] = useState(false);
  const {updatePlayerAttribute} = useContext(PartidaContext)

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  const handleCumplir = () => {
    if(!jugo){
        jugador.puntaje += parseInt(selectedValue) * 3 + 10;
        jugador.cumplio.bool = true;
        jugador.cumplio.difer = 0;
    }
    updatePlayerAttribute(jugador.id, 'manosJugadas')
    updatePlayerAttribute(jugador.id, 'manosCumplidas')
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

    updatePlayerAttribute(jugador.id, 'manosJugadas')
    setPuntaje(jugador.puntaje)
    setJugo(true)
    onActionComplete(jugador.id);
    onPuntaje(index, jugId, jugador.puntaje);
  }

  return (
    <td className={classNames(
      'whitespace-nowrap text-sm font-medium text-gray-900',
      reparte ?  'bg-blue-100' : ''
    )}>
      <div className="flex flex-col">
        <div 
        className={classNames(
          'text-right p-2 font-semibold text-xl font-extrabold ',
          jugador.cumplio.bool !== null ? (
            jugador.cumplio.bool ? 'text-green-700' : 'text-red-700' 
          ) : '')}
        >
          {jugo ? puntaje : jugador.puntaje}
        </div>
        <div className="flex">
            {jugo || jugador.cumplio.bool !== null ? <div className='w-4 text-center'>{selectedValue}</div> : <SelectorHome options={options} selectedValue={selectedValue} handleChange={handleChange}/>}
          {jugo || jugador.cumplio.bool !== null  ? '' :           <button 
            className="bg-green-600 h-6 w-full flex items-center justify-center"
            aria-label="Confirm"
            onClick={handleCumplir}
          >
            <img src={check} alt="check" className='h-4 w-4' />
          </button>}
          {jugo || jugador.cumplio.bool !== null  ? '' :
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
