import Languages from "./Languages";

const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flags.svg} alt="Country flag" width={200} height={100}/>
    </div>
  );
}

export default CountryInfo;