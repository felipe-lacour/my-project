import { useContext, useEffect, useState } from 'react';
import { PartidaContext } from '../../context/partidaContext.js';
import { useRouterParams } from '../../customHooks/useRouterParams.jsx';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { TableBody } from '../home/TableBody.jsx';
import Casilla from '../home/Casilla.jsx';
import { TableHead } from '../home/TableHead.jsx';
import { JugadoresContext } from '../../context/jugadoresContext.js';
import GuardarPartida from '../home/GuardarPartida.jsx';

export const PartidaPrevia = () => {
    const { setSequence, sequence, handleActionComplete, handlePuntaje, setNombres, nombres, setMano, mano } = useContext(PartidaContext);
    const { jugadores } = useContext(JugadoresContext);
    const [manoActual, setManoActual] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const db = getFirestore();

    const partidaId = useRouterParams();


    const fetchData = async () => {
        try {
            const docRef = doc(db, 'partidas', partidaId);
            const snapshot = await getDoc(docRef);
            const data = snapshot.data();
            
            let nullFound = false;
            outerLoop: for (const mano of data.manos) {
                for (const jugador of mano.jugadores) {
                    if (jugador.cumplio.bool === null) {
                        nullFound = true;
                        setMano((prevMano) => mano.numero + 1);
                        setManoActual((prevMano) => mano.numero + 1)
                        break outerLoop;
                    }
                }
            }

            if (nullFound && manoActual) {
                const nombresActuales = data.manos[0].jugadores.map(jugadorId => {
                    const jugador = jugadores.find(j => j.id === jugadorId.id);
                    return jugador ? { id: jugador.id, nombre: jugador.data.nombre } : null;
                }).filter(j => j !== null); // Filter out null values

                setSequence(data);
                console.log(nombresActuales)
                setNombres(nombresActuales);
                console.log('Data:', data)
            }

            setLoading(false); 
        } catch (error) {
            console.error("Error fetching data: ", error);
        }// finally {
            
        // }
    };
    useEffect(() => {
        if (partidaId) {
            fetchData();
        }
    }, [partidaId, manoActual, jugadores, db, setNombres, setSequence]);

    useEffect(() => {
        console.log('sequence:', sequence);
        console.log('nombres:', nombres);
        console.log('mano', mano)
    }, [sequence, nombres]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }


return (
    <>
        {loading ? (
            <div>Loading...</div>
        ) : (nombres.length && sequence ? (
            <div>
                <table className="min-w-full divide-y divide-gray-300 pt-0">
                    <TableHead nombres={nombres} />
                    <TableBody
                        mano={mano}
                        sequence={sequence}
                        handleActionComplete={handleActionComplete}
                        handlePuntaje={handlePuntaje}
                        Casilla={Casilla}
                    />
                </table>
                <GuardarPartida sequence={{...sequence, id:partidaId}}/>
            </div>
        ) : (
            
            <div>No data available {console.log(nombres.length)}{console.log(sequence)}</div>
        ))}
    </>
);

};
