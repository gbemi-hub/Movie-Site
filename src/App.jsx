import React from "react"
import Search from "./component/Search"
import { useState ,useEffect } from "react"
import Seriescard from "./component/Seriescard";
import { useDebounce } from 'react-use'

// const api_base = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${api_key}`
  }
};



function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [Series,setSeries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState(null)
  const [debounce ,setDebounce] = useState("")

  useDebounce(() =>
    setDebounce(searchTerm),500, [searchTerm]
  );
  useEffect(() => {
  setIsLoading(true);
  setError(null);


  const url = debounce.trim()
    ? `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(debounce)}&include_adult=false&language=en-US&page=1`
    : 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';

  fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network error");
      }
      return res.json();
    })
   .then(data => {
      if (data.success == false) {
        console.log("API error:", data.status_message || "Api fetch fail");
        return;
      }
        setSeries(data.results);
    })
    .catch(err => {
      console.error(err);
      setError("Error fetching series");
    })
    .finally(() => setIsLoading(false));

}, [debounce]); 




  return (
    <main>
      <div className="structure">
    <div className="main">
      <header>
        <img src="./hero.png" alt="hero banner" />
        <h1><span className="text-gradient">Series</span> you will Enjoy</h1>
           <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      <section className="all-series">
        <h2 className="mt-40px">All Series</h2>
        {isLoading? (
          <p className="text-blue">Loading...,please wait a moment</p>
        ) :error ? (
          <p className="text-red-500"> {error}</p>
        ) : (
          <ul>
           {Series.map((serie) =>(
           <Seriescard key={serie.id} serie = {serie}/>
           )
            
           )}
          </ul>
        )}

      </section>
      
   
   
    </div>
    </div>
    </main>
  )
}

export default App
