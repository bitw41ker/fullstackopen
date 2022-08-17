const CountryInfo = ({country}) => {
  const langs = [];

  for(let lang in country.languages) {
    if (country.languages.hasOwnProperty(lang)) {
      langs.push(country.languages[lang]);
    }
  }

  const langListItems = langs.map((language, i) =>
      <li key={i}>{language}</li>
  )

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {langListItems}
      </ul>
      <img src={country.flags.svg} alt="Country flag" width={200} height={100}/>
    </div>
  );
}

export default CountryInfo;