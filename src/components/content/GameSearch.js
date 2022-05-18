import React, { useEffect, useState } from 'react'
import SearchResultTile from './SearchResultTile'

export default function GameSearch(props) {
  const [gameSearch, setGameSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  function selectOption(option) {
    props.selectGame(option)
    setGameSearch('')
    setSearchResults([])
    resultTiles()
  }

  function resultTiles() {
    let tiles = []
    for (let i in searchResults) {
      tiles.push(<SearchResultTile result={searchResults[i]} selectOption={selectOption} key={i} />)
    }
    return tiles
  }

  function handleGameSearch(event) {
    event.preventDefault()
    setGameSearch(event.target.value)
    if(event.target.value) {
      let url = `https://api.rawg.io/api/games?key=0a510db17ca94d949b927e45c32f02c0&search=${event.target.value}&page_size=10`
      fetch(url).then(result => result.json()
      ).then((data) => {
        setSearchResults(data.results)
      })
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="GameSearch">
      <div>
        <h3>Add Game</h3>
      </div>
      <div>
        <input type="text" id="rawg-search" onChange={handleGameSearch} value={gameSearch} placeholder="Search games"/>
      </div>
      <div>
        {resultTiles()}
      </div>
    </div>
  )
  
}