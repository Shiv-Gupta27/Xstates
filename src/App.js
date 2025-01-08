import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [selectcountry, setSelectedCountry] = useState("");

  const [countries, setcountries] = useState([]);

  const [selectState, setSelectedState] = useState("");

  const [state, setState] = useState([]);

  const [selectCity, setSelectedCity] = useState("");

  const [city, setCity] = useState([]);

  const CountryApi = "https://crio-location-selector.onrender.com/countries";

  const stateApi = `https://crio-location-selector.onrender.com/country=${selectcountry}/states`;

  const cityApi = `https://crio-location-selector.onrender.com/country=${selectcountry}/state=${selectState}/cities`;

  useEffect(() => {
    const fetchCountry = async () => {
      try{
        const response = await fetch(CountryApi);
        const jsonData = await response.json();
        setcountries(jsonData);
      }catch(e){
        console.error(e);
      }
      
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    setSelectedCity("");
    setSelectedState("");
    const fetchCountry = async () => {
      try{
        const response = await fetch(stateApi);
        const jsonData = await response.json();
        setState(jsonData);
      }catch(e){
        console.error(e);
      }
      
    };
    fetchCountry();
  }, [selectcountry]);

  useEffect(() => {
    const fetchCountry = async () => {
      try{
        const response = await fetch(cityApi);
        const jsonData = await response.json();
        setCity(jsonData);
      }catch(e){
        console.error(e)
      }
      
    };
    fetchCountry();
  }, [selectState]);

  return (
    <div>
      <h1>Select Location</h1>
      <select
        name="selectCountry"
        value={selectcountry}
        onChange={(event) => {
          setSelectedCountry(event.target.value);
        }}
        className = "selectMargin"
      >
        <option value="" disabled>
          select Country
        </option>
        {countries.map((ele, idx) => {
          return (
            <option value={ele} key={idx}>
              {ele}
            </option>
          );
        })}
      </select>
      <select
        name="selectState"
        disabled={selectcountry ? false : true}
        value={selectState}
        onChange={(event) => {
          setSelectedState(event.target.value);
        }}
        className = "selectMargin"
      >
        <option value="" disabled>
          select State
        </option>
        {state.map((ele, idx) => {
          return (
            <option value={ele} key={idx}>
              {ele}
            </option>
          );
        })}
      </select>
      <select
        name="selectCity"
        disabled={selectState ? false : true}
        value={selectCity}
        onChange={(event) => {
          setSelectedCity(event.target.value);
        }}
        className = "selectMargin"
      >
        <option value="" disabled>
          select City
        </option>
        {city.map((ele, idx) => {
          return (
            <option value={ele} key={idx}>
              {ele}
            </option>
          );
        })}
      </select>

      {selectCity ? (
        <>
          <h2>
            {`You selected ${selectCity}, ${selectState}, ${selectcountry}`}
          </h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
