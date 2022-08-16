import CountryInfo from './CountryInfo'

const Countries = ({countries, filterValue}) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (filteredCountries.length === 1) {
    return (
      <CountryInfo country={filteredCountries[0]} />
    );
  }

  return (
    filteredCountries.map((country, i) =>
      <div key={i}>
        {country.name.common}
      </div>
    )
  );
}

export default Countries;