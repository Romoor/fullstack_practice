import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country }) => {
  console.log("name", country.name.common);
  return (
    <div>
      <p>Name: {country.name.common}</p>
      <p>Capital: {country.capital?.[0] ?? "N/A"}</p>
      <p>Area: {country.area}</p>
      <p>Languages: </p>
      <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
      <img src={country.flags?.png} alt={country.flags?.alt}></img>
    </div>
  )
}

const App = () => {
  const [country, setCountry] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    console.log("effect called, value is now: ", value);
    if (value) {
      console.log("searching country...");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountry(response.data.filter(e => e.name.common.toLowerCase().includes(value))
          )
          console.log("searchedCountry", country);
          //console.log("no1", country[0].name.common);
        })
    }
  }, [value])
  console.log("newCountry", country);
  console.log("newValue", value);


  console.log("countryLength", country.length);
  const handleValueChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>Search country: <input value={value} onChange={handleValueChange} />
      {country.length > 10 && <p>Too many matches, specify country more</p>}
      {country.length < 10 && country.length > 1 && country.map(country => <p key={country.name.common}>{country.name.common}</p>)}
      {country.length === 1 && <CountryInfo country={country[0]} />}

    </div>
  )
}

export default App
