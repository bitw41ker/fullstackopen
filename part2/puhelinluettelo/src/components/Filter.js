const Filter = ({value, handleValue}) => {
  return (
    <div>
      filter shown with:
      <input 
        value={value}
        onChange={handleValue}/>
    </div>
  )
}

export default Filter;