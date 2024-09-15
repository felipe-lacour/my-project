export const TableBody = ({ mano, sequence, handleActionComplete, handlePuntaje, Casilla }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white max-h-80 overflow-y-hidden">
            {Array.from({ length: mano }).map((_, handIndex) => (
                <tr key={handIndex} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                        {/* Ensure sequence.manos exists and has data */}
                        {sequence.manos && sequence.manos[handIndex] ? sequence.manos[handIndex].numero : "N/A"}
                    </td>
                    {/* Check if jugadores exist for this hand */}
                    {sequence.manos && sequence.manos[handIndex] && sequence.manos[handIndex].jugadores
                        ? sequence.manos[handIndex].jugadores.map((jugador, jugadorIndex) => {
                            // Define the reparte logic:
                            const reparte = jugadorIndex === handIndex % sequence.manos[handIndex].jugadores.length;
                            return (
                                <Casilla
                                    key={jugador.id}
                                    jugador={jugador}
                                    n={sequence.manos[handIndex].numero}
                                    onActionComplete={handleActionComplete}
                                    onPuntaje={handlePuntaje}
                                    index={handIndex}
                                    jugId={jugador.id}
                                    reparte={reparte ? true : false}
                                />
                            );
                        })
                        : <td className="py-4">No data available</td>}
                </tr>
            ))}
        </tbody>
    );
}
