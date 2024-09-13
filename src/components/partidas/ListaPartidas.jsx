import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { TodasPartidasContext } from '../../context/todasPartidasContext';
import { useContext } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListaPartidas() {
    const {partidas} = useContext(TodasPartidasContext);

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">Partidas</h2>
        {!partidas.length ? (
            <div className='flex justify-center items-center h-screen w-full'>
                <ArrowPathIcon className='h-14 w-14  fill-current text-red-600 animate-spin' />
            </div>
        ) : (
        <div>
            <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {partidas.map((partida) => (
                <li key={partida.id} className="col-span-1 flex rounded-md shadow-sm">
                    <div
                    className={classNames(
                        'flex flex-col gap-2 pt-2 w-full h-auto flex-shrink-0 items-center justify-center', 
                        'rounded-l-md text-sm font-medium text-black bg-gray-100 rounded-lg cursor-pointer overflow-hidden',
                    )}
                    >
                        <div className='text-lg'>
                            {partida.data.date}
                        </div>
                        {partida.data.complete ? (
                            <div className='bg-green-600 w-full text-center text-white font-black'>Completo</div>
                        ) : (
                            <div className='bg-red-600 w-full text-center text-white font-black'>Incompleto</div>
                        )}
                    </div>
                </li>
                ))}
            </ul>
            </div>)}
        </div>

    )
}
