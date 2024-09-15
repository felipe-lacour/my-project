export const TableHead = ({nombres}) => {
    return <thead className='sticky top-0 bg-white'>
    <tr className="divide-x divide-gray-200">
    <th scope="col" className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pl-0 w-10">
        N
    </th>
    {nombres.map((i) => (
        <th key={i.id} scope="col" className="py-3.5 ml-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-4">
        {i.nombre}
        </th>
    ))}
    </tr>
    </thead>
}