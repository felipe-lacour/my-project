import { useContext, useState } from "react";
import closeDark from "../../img/closeDark.svg";
import { JugadoresContext } from "../../context/jugadoresContext";
import { PartidaContext } from "../../context/partidaContext";

export default function Eleccion({ setEleccion, generarTablero }) {
    const { jugadores } = useContext(JugadoresContext);
    const {setNombres} = useContext(PartidaContext)
    const [selectedJugadores, setSelectedJugadores] = useState([]);

    // Handle checkbox selection
    const handleCheckboxChange = (jugador) => {
        setSelectedJugadores(prevSelected => {
            const isSelected = prevSelected.some(j => j.id === jugador.id);

            if (isSelected) {
                // If already selected, remove from the array
                return prevSelected.filter(j => j.id !== jugador.id);
            } else {
                // If not selected, add to the array
                return [...prevSelected, { id: jugador.id, nombre: jugador.data.nombre }];
            }
        });
    };

    // Check if a player is selected by its id
    const isSelected = (jugadorId) => {
        return selectedJugadores.some(j => j.id === jugadorId);
    };

    return (
        <fieldset className="absolute bg-gray-100 w-1/2 left-1/2 -translate-x-1/2 -transalte-y-1/2 p-6 rounded-xl ">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-500">Jugadores</h2>
                <button onClick={() => setEleccion(false)}>
                    <img src={closeDark} alt="Close" />
                </button>
            </div>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 bg-gray-100 max-h-96 overflow-y-scroll">
                {jugadores.map((jugador) => (
                    <div key={jugador.id} className="relative flex items-start py-4">
                        <div className="min-w-0 text-sm leading-6 flex-1 ">
                            <label htmlFor={`person-${jugador.id}`} className="select-none font-medium text-gray-900 items-center gap-4 flex">
                                <img src={jugador.data.img} alt="" className="w-10 h-10 border-2 rounded-full border-gray-900"/>
                                {jugador.data.nombre}
                            </label>
                        </div>
                        <div className="ml-3 flex h-6 items-center">
                            <input
                                id={`person-${jugador.id}`}
                                name={`person-${jugador.id}`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                checked={isSelected(jugador.id)} // Bind checkbox state
                                onChange={() => handleCheckboxChange(jugador)} // Handle change
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button 
                onClick={() => {
                    setNombres(selectedJugadores)
                    generarTablero(selectedJugadores)
                    setEleccion(false)
                }} 
                className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Comenzar
            </button>
        </fieldset>
    );
}
