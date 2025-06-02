import React, { useEffect, useRef, useState } from 'react'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
import './TitleCards.css'

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [ apiData, setApiData ] = useState([]);

  const handleScroll = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleScroll)
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDdhNjE1MGE3NDIxM2Y5ZGJhMDJlOTAyMGEzZjk3YiIsIm5iZiI6MTc0NzIyNDc4OS44ODEsInN1YiI6IjY4MjQ4OGQ1ZmJmYmQyMGFjYjJkMjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4loi3Ll5aPHudD6_mPwnOXrtOcV_hK9zXn0IV6ltTAQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  }, [])
  
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Populer On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          return <Link to = {`/player/${card.id}`} key={card.id} className='card'>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })
        }
      </div>
    </div>
  )
}

export default TitleCards
