import React from "react"
import '../../styles/SearchResultTile.css'

export default function SearchResultTile(props) {

  function displayPlatforms() {
    let platforms = []
    for (let i in props.result.platforms) {
      platforms.push(props.result.platforms[i].platform.name)
    }
    let platformString = platforms.join(" : ")
    return (
      <span>{platformString}</span>
    )
  }

  function displayReleaseDate() {
    if(props.result.released) return props.result.released.split("-")[0]
    return "n/a"
  }

  return (
    <div className="SearchResultTile">
      <button className="result-button" onClick={() => {props.selectOption(props.result)}}>
        {props.result.name}<span className="release-date"> ({displayReleaseDate()})</span>
        <div className="platforms">
          {displayPlatforms()}
        </div>
      </button>
    </div>
  )
}
