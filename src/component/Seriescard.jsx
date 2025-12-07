import React from "react"
const Seriescard = ({serie}) => {
      return(
        <div className="serie-card">
          <img
  src={serie.poster_path ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}` : '/no-movie.png'}
  alt={serie.name}
/>

         
         <div className="mt-4">
          <h3>{serie.name}</h3>
          <div className="content">
            <div className="rating">
             <img src="star.svg" alt="star-icon" />
             <p>{serie.vote_average ? serie.vote_average.toFixed(1) : "N/A"}
</p> 
     </div>        
              <span>•</span>
              <p className="lang">{serie.original_language}</p>
               <span>•</span>
               <p className="year">{serie.first_air_date ? serie.first_air_date.split("-")[0] : "N/A"}
</p>

             
            </div>

          </div>

         </div>
        
      
      )
}
export default Seriescard