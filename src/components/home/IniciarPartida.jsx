import { useState } from "react"
import Eleccion from "./Eleccion"


export default function IniciarPartida({generarTablero}){
    const [eligiendo, setEligiendo] = useState(false)

    return(
        <>
            {eligiendo ? (
                <div className="before:contents-[] before:w-screen before:h-screen before:bg-slate-950/70 before:fixed before:top-0 before:left-0">
                    <Eleccion setEleccion={setEligiendo} generarTablero={generarTablero}/>
                </div>
            ): (
            <div>
                <button
                type="button"
                className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => setEligiendo(true)}
                >
                Iniciar Partida
                </button>
            </div>)}
        </>
)
}