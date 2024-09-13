import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Tabla from './components/home/Tabla';
import ListaPartidas from './components/partidas/ListaPartidas';
import { PartidaContextProvider } from './context/partidaContext';
import ListaJugadores from './components/jugadores/ListaJugadores';
import { TodasPartidasContextProvider } from './context/todasPartidasContext';
import { JugadoresContextProvider } from './context/jugadoresContext';
import AgregarJugador from './components/jugadores/AgregarJugador';

export default function App() {
  return (
    <JugadoresContextProvider>
      <TodasPartidasContextProvider>
        <PartidaContextProvider>
          <Routes>
            <Route path='/' element={<Home children={<Tabla />} />}/>
            <Route path='/partidas' element={<Home children={<ListaPartidas/>}/>}/>
            <Route path='/estadisticas' element={<Home children={<h1>Estadisticas</h1>} />}/>
            <Route path='/torneo' element={<Home children={<h1>Torneo</h1>} />}/>
            <Route path='/jugadores' element={<Home children={<ListaJugadores />} />}/>
            <Route path='/jugadores/agregar' element={<Home children={<AgregarJugador />} />}/>
          </Routes>
        </PartidaContextProvider>
      </TodasPartidasContextProvider>
    </JugadoresContextProvider>
  )
}
