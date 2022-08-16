import { useState, useEffect } from 'react';
import CountryFilter from './ContryFilter';
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(
    () => {
      fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        });
    },
    []
  );

  return (
    <div>
      <CountryFilter
        value={filterValue}
        handleValue={(event) => setFilterValue(event.target.value)}
      />

      <Countries
        countries={countries}
        filterValue={filterValue}
      />
    </div>
  );
}

export default App;
