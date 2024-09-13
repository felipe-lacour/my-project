import { createContext, useEffect, useState } from "react";
import { usePartidas } from '../customHooks/usePartidas.jsx'


const TodasPartidasContext = createContext();

const TodasPartidasContextProvider = ({children}) => {
    const [partidas, setPartidas] = useState([])
    let partidasList = usePartidas();

    useEffect(() => {
        setPartidas(partidasList)
    }, [partidasList])

    const contextValue = {
        partidas
    }

    return(
        <TodasPartidasContext.Provider value={contextValue}>
            {children}
        </TodasPartidasContext.Provider>
    );
}

export {TodasPartidasContext, TodasPartidasContextProvider};