export default function SelectorHome ({options, selectedValue, handleChange}){
    return <select id="dropdown" name="dropdown" onChange={handleChange} value={selectedValue}>
        {options.map(option => (
            <option key={option} value={option}>
            {option}
            </option>
        ))}
    </select>
}