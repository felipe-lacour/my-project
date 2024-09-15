import { doc, getDoc, getFirestore, updateDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";


const PartidaContext = createContext();

const PartidaContextProvider = ({children}) => {    
    const now = new Date();

    const [sequence, setSequence] = useState({
        date: now.toLocaleDateString(),
        manos:[],
        complete: false
      });
      const [nombres, setNombres] = useState([])
      const [mano, setMano] = useState(1);
      const [completedActions, setCompletedActions] = useState([]);
      const [start, setStart] = useState(false)
      const [saveComplete, setSaveCompleted] = useState(false);
      const [completed, setCompleted] = useState(false);

    const generarTablero = (n) => {
        const seq = { manos: [] };
        
        let numeroManos = Math.floor(52 / n.length);
        let numeroSubida;
        
        if (numeroManos * n.length === 52) {
            numeroManos -= 1;
            numeroSubida = numeroManos;
        } else {
            numeroSubida = numeroManos;
        }
    
        for (let index = 1; index <= numeroSubida; index++) {
            const mano = { numero: index, jugadores: [] }; 
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano);
        }
    
        for (let index = numeroSubida + 1; index <= numeroSubida + n.length; index++) {
            const mano = { numero: numeroSubida, jugadores: [] };
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano);
        }
    
        for (let index = numeroSubida; index >= 1; index--) {
            const mano = { numero: index, jugadores: [] };
            n.forEach((i) => {
            mano.jugadores.push({ id: i.id, puntaje: 0, cumplio: { difer: null, bool: null } });
            });
            seq.manos.push(mano);
        }
        console.log(seq)
        setSequence((prevSeq) => ({ ...prevSeq, manos: seq.manos }));
    };

    const handleActionComplete = (id) => {
        setCompletedActions((prevCompleted) => {
          const newCompleted = [...prevCompleted, id];
          if (newCompleted.length === nombres.length) {
            setSaveCompleted((saved) => !saved)
            setMano((prevMano) => {
                if(prevMano === sequence.manos.length) {
                    setSequence(prevSeq => ({...prevSeq, complete: true}))
                    setCompleted(true)
                } else {
                    return prevMano + 1
                }
            });
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

    const updatePlayerAttribute = async (playerId, attributeName) => {
      const db = getFirestore();
      const playerDocRef = doc(db, "jugadores", playerId); // Assuming the collection is named 'jugadores'
    
      try {
        // Fetch the current document
        const playerDocSnapshot = await getDoc(playerDocRef);
        
        if (playerDocSnapshot.exists()) {
          // Access the old value of the attribute
          const oldValue = playerDocSnapshot.data()[attributeName];
          console.log("Old Value:", oldValue);
          
          // Update the document with the new value
          await updateDoc(playerDocRef, {
            [attributeName]: oldValue + 1
          });

          console.log("Player attribute updated successfully!");
    
        } else {
          console.log("No such player document!");
        }
      } catch (error) {
        console.error("Error updating player attribute: ", error);
      }
    };

    const handleGuardarPartida = (sequenceParam = sequence) => {
        const db = getFirestore();
        const playCollection = collection(db, 'partidas');
    
        getDocs(playCollection).then(snapshot => {
          if (sequenceParam.id) {
            const existingDoc = snapshot.docs.find(doc => doc.id === sequenceParam.id);
            if (existingDoc) {
              const docRef = doc(db, 'partidas', sequenceParam.id);
                const seqHelper = {date: sequenceParam.date, manos: sequenceParam.manos, complete: sequenceParam.complete}

              updateDoc(docRef, seqHelper)
                .then(() => {
                  setSaveCompleted(true);
                  setStart(false);
                })
                .catch(error => {
                  console.error("Error updating document: ", error);
                });
            } else {
              // Document with ID not found, add as a new document
              addDoc(playCollection, sequenceParam)
                .then(docRef => {
                  setSequence(prevSeq => ({ ...prevSeq, id: docRef.id })); // Update sequence with Firebase-generated ID
                  setSaveCompleted(true);
                  setStart(false);
                })
                .catch(error => {
                  console.error("Error adding document: ", error);
                });
            }
          } else {
            // Add a new document and update sequence with its ID
            addDoc(playCollection, sequenceParam)
              .then(docRef => {
                setSequence(prevSeq => ({ ...prevSeq, id: docRef.id })); // Update sequence with Firebase-generated ID
                setSaveCompleted(true);
                setStart(false);
              })
              .catch(error => {
                console.error("Error adding document: ", error);
              });
          }
        });
      };

    const handleEndPartida = () => {
        if(sequence.complete && completed){
            handleGuardarPartida();
            const jugadoresPartida = sequence.manos[sequence.manos.length - 1].jugadores;
            let maxPuntaje = {id: '', puntaje: -10};

            jugadoresPartida.forEach((j) => {
                if(j.puntaje > maxPuntaje.puntaje) maxPuntaje = j;
            })

            updatePlayerAttribute(maxPuntaje.id, 'partidasGanadas');
        }
    }

    useEffect(() => {
        handleEndPartida();
        // eslint-disable-next-line 
    }, [sequence])

    

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
        handlePuntaje,
        setStart,
        start,
        saveComplete,
        setSaveCompleted,
        updatePlayerAttribute,
        handleGuardarPartida,
    }

    return(
        <PartidaContext.Provider value={contextValue}>
            {children}
        </PartidaContext.Provider>
    );
}

export {PartidaContext, PartidaContextProvider};