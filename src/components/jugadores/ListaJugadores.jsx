import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JugadoresContext } from '../../context/jugadoresContext.js';

export default function ListaJugadores() {
    const {jugadores} = useContext(JugadoresContext);

  return (
    <div>
        <h2 className="text-sm font-medium text-gray-500">Jugadores</h2>
        {jugadores.length ? (
            <div>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
                {jugadores.map((jugador) => (
                    <li
                    key={jugador.id}
                    className="relative col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-100 text-center overflow-hidden"
                    >
                    <dl className="absolute top-2 right-2">
                        <dd className="flex items-center">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-green-600/20">
                                {jugador.data.manosJugadas === 0? 100 : ((jugador.data.manosCumplidas / jugador.data.manosJugadas)*100).toFixed(2)}%
                            </span>
                        </dd>
                    </dl>
                    <div className="flex flex-1 flex-col p-8">
                        <img alt="" src={jugador.data.img} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
                        <h3 className="mt-6 text-sm font-medium text-gray-900">{jugador.data.nombre}</h3>
                        <dl className="mt-1 flex flex-grow justify-between items-center">
                            <dd className="text-sm text-gray-500">Partidas ganadas:</dd>
                            <dd className="flex items-center">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {jugador.data.partidasGanadas}
                                </span>
                            </dd>
                        </dl>
                        <dl className="mt-1 flex flex-grow justify-between items-center">
                            <dd className="text-sm text-gray-500">Partidas jugadas:</dd>
                            <dd className="flex items-center">
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-green-600/20">
                                    {jugador.data.partidasJugadas}
                                </span>
                            </dd>
                        </dl>
                    </div>
                    </li>
                ))}
                </ul>
                <Link
                    to={'/jugadores/agregar'}
                    className="fixed bottom-8 right-8 block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Agregar Jugador
                </Link>
            </div>
        ) : (
            <div className='flex justify-center items-center h-screen w-full'>
                <ArrowPathIcon className='h-14 w-14  fill-current text-red-600 animate-spin' />
                <Link
                    to={'/jugadores/agregar'}
                    className="fixed bottom-8 right-8 block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Agregar Jugador
                </Link>
            </div>
        )}
    </div>
  )
}
