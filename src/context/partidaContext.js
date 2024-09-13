import { createContext, useState } from "react";


const PartidaContext = createContext();

const PartidaContextProvider = ({children}) => {    
    const now = new Date();

    const initialNombres = [
        { nombre: 'Felipe', id: '1', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Nico', id: '2', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Pedro', id: '3', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Negro', id: '4', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Diego', id: '5', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Santiago', id: '6', puntaje: 0, cumplio: {difer: null, bool: null} },
        { nombre: 'Juan', id: '7', puntaje: 0, cumplio: {difer: null, bool: null} }
      ];

    const [sequence, setSequence] = useState({
        date: now.toLocaleDateString(),
        manos:[],
        complete: false
      });
      const [nombres, setNombres] = useState(initialNombres)
      const [mano, setMano] = useState(1);
      const [completedActions, setCompletedActions] = useState([]);

    const generarTablero = (n) => {
        const seq = { manos: [] }; // Initialize manos as an empty array
        
        let numeroManos = Math.floor(52 / n.length);
        let numeroSubida;
        
        if (numeroManos * n.length === 52) {
            numeroManos -= 1;
            numeroSubida = numeroManos;
        } else {
            numeroSubida = numeroManos;
        }
    
    // Loop to create the first set of hands (ascending)
        for (let index = 1; index <= numeroSubida; index++) {
            const mano = { numero: index, jugadores: [] }; // Create a new mano object
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano); // Add the completed mano to the manos array
        }
    
    // Loop to create the second set of hands (ascending)
        for (let index = numeroSubida + 1; index <= numeroSubida + n.length; index++) {
            const mano = { numero: numeroSubida, jugadores: [] };
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano);
        }
    
    // Loop to create the descending hands
        for (let index = numeroSubida; index >= 1; index--) {
            const mano = { numero: index, jugadores: [] };
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano);
        }
    
    // Update the state with the new sequence
        setSequence((prevSeq) => ({ ...prevSeq, manos: seq.manos }));
    };

    const handleActionComplete = (id) => {
        setCompletedActions((prevCompleted) => {
          const newCompleted = [...prevCompleted, id];
          if (newCompleted.length === nombres.length) {
            setMano((prevMano) => prevMano + 1);
            setCompletedActions([]);
          }
          return newCompleted;
        });
    };
    
    const handlePuntaje = (index, id, newPuntaje) => {
    setSequence((prevSeq) => {
        const newSeq = { ...prevSeq }; // Create a shallow copy of the sequence
        const newIndex = index + 1; // Determine the next hand index
    
        if (newIndex < newSeq.manos.length) {
        // Find the player in the next hand
        newSeq.manos[newIndex].jugadores = newSeq.manos[newIndex].jugadores.map((jugador) => {
            if (jugador.id === id) {
            return { ...jugador, puntaje: newPuntaje };
            }
            return jugador;
        });
        }
        
        return newSeq; // Return the updated sequence
    });
    };

    const contextValue = {
        sequence,
        setSequence,
        nombres,
        setNombres,
        mano,
        setMano,
        completedActions,
        setCompletedActions,
        generarTablero,
        handleActionComplete,
        handlePuntaje
    }

    return(
        <PartidaContext.Provider value={contextValue}>
            {children}
        </PartidaContext.Provider>
    );
}

export {PartidaContext, PartidaContextProvider};