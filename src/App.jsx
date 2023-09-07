import './App.css'
import { Pokedex } from 'pokeapi-js-wrapper'
import { useEffect, useState } from 'react'
import customOptions from './customOptions'
import AutocompleteInput from './autocompleteInput'
import fetchNameList from './fetchNameList'
import FetchGif from './fetchGif'

function App () {
  const [FetchNameListData, setFetchNameListData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [name, setName] = useState('pikachu')
  const [result, setResult] = useState('')

  useEffect(() => {
    async function fetchData () {
      try {
        const data = await fetchNameList()
        setFetchNameListData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    return () => fetchData()
  }, [])
  function generateRandomName () {
    const random = Math.floor(Math.random() * 650)
    setName(FetchNameListData[random])
  }

  function handleCheckButtonClick () {
    setInputValue('')
    if (name === inputValue) {
      const show = `correct,${name}`
      setResult(show)
    } else {
      const show = `wrong,it's${name}`
      setResult(show)
    }
  }

  function handleButtonClick () {
    generateRandomName()
    setInputValue('')
    setResult('')
  }

  return (
    <div id='container'>
      {FetchNameListData.length === 650
        ? (
          <>
            <FetchGif data={FetchNameListData} inputValue={inputValue} setInputValue={setInputValue} name={name} setName={setName} />
            <AutocompleteInput data={FetchNameListData} inputValue={inputValue} setInputValue={setInputValue} />
            <button onClick={() => handleButtonClick()}>next</button>
            <button onClick={() => handleCheckButtonClick()}>check</button>
            <div id='result'>{result}</div>
          </>
          )
        : <p>loading</p>}
    </div>
  )
}

export default App
