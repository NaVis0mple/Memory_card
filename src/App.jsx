import './App.css'
import { Pokedex } from 'pokeapi-js-wrapper'
import { useEffect, useState } from 'react'
import customOptions from './customOptions'
import AutocompleteInput from './autocompleteInput'
import FetchNameList from './fetchNameList'
import FetchGif from './fetchGif'

function App () {
  const FetchNameListData = FetchNameList()

  return (
    <div id='container'>
      <FetchGif data={FetchNameListData} />
      <AutocompleteInput data={FetchNameListData} />
    </div>
  )
}

export default App
