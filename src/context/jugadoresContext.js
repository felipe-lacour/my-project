import { createContext, useEffect, useState } from "react";
import { useJugadores } from '../customHooks/useJugadores.jsx'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import Firebase storage functions
import app from '../index.js'; // Import the initialized app
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'


const JugadoresContext = createContext();

const JugadoresContextProvider = ({children}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Hook to access the current URL
    const currentPath = location.pathname;
    const [jugadores, setJugadores] = useState([])
    let jugadoresList = useJugadores();

    useEffect(() => {
        setJugadores(jugadoresList)
    }, [jugadoresList])

    useEffect(() => {
        setNombre('');
        setUploadProgress(0);
        if(currentPath === '/jugadore/agregar') navigate('/jugadores');
        // eslint-disable-next-line
    }, [jugadores]);

    const handleUpload = () => {
        const storage = getStorage(app); // Use the initialized app to get storage
    
        if (selectedFile) {
          const storageRef = ref(storage, `images/${selectedFile.name}`); // Reference to the file location
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Error uploading file:', error);
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setDownloadURL(url);

                    const playerData = {
                        nombre: nombre,
                        img: url,
                        partidasGanadas: 0,
                        partidasJugadas: 0,
                        manosJugadas: 0,
                        manosCumplidas: 0
                    };

                    const db = getFirestore();
                    const playCollection = collection(db, 'jugadores');

                    // Add the document to Firestore
                    await addDoc(playCollection, playerData);

                    // Update state with new jugadores data
                    getDocs(playCollection).then(snapshot => {
                        if(snapshot.size === 0) console.log('no results')
                        else {
                          const newList = snapshot.docs.map(doc => {
                            return { id: doc.id, data: doc.data() }
                          })
                          setJugadores(newList)
                        }
                      })
                    
                } catch (error){console.log(error)}
        })
        }
      };



    const contextValue = {
        jugadores,
        selectedFile,
        setSelectedFile,
        uploadProgress,
        setUploadProgress,
        downloadURL,
        setDownloadURL,
        nombre,
        setNombre,
        navigate,
        handleUpload
    }

    return(
        <JugadoresContext.Provider value={contextValue}>
            {children}
        </JugadoresContext.Provider>
    );
}

export {JugadoresContext, JugadoresContextProvider};