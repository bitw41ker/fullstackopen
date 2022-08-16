const Languages = ({languages}) => {
  let langs = [];

  for(let lang in languages) {
    if (languages.hasOwnProperty(lang)) {
      langs.push(languages[lang]);
    }
  }

  return (
    langs.map((language, i) =>
      <li key={i}>{language}</li>
    )
  );
}

export default Languages;