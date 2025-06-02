import React, { useEffect, useState } from 'react'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'
import './Player.css'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [ apiData, setApiData ] = useState({
    key: "",
    published_at: "",
    name: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDdhNjE1MGE3NDIxM2Y5ZGJhMDJlOTAyMGEzZjk3YiIsIm5iZiI6MTc0NzIyNDc4OS44ODEsInN1YiI6IjY4MjQ4OGQ1ZmJmYmQyMGFjYjJkMjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4loi3Ll5aPHudD6_mPwnOXrtOcV_hK9zXn0IV6ltTAQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  }, [])
  
    
  return (
    <div className='Player'>
        <img src={back_arrow_icon} alt="" onClick={()=> {navigate('/')}} />
        <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' 
        frameBorder='0' allowFullScreen='90%'></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
    </div>
  )
}

export default Player;
