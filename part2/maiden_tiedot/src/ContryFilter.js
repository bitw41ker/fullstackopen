const CountryFilter = ({value, handleValue}) => {
  return (
    <div>
      Find countries:
      <input 
        value={value}
        onChange={handleValue}
      />
    </div>
  )
}

export default CountryFilter;