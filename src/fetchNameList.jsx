import { useEffect, useState } from 'react'
import customOptions from './customOptions'
import { Pokedex } from 'pokeapi-js-wrapper'

const P = new Pokedex(customOptions)

function FetchNameList () {
  const [list, setList] = useState([])
  useEffect(() => {
    const interval = {
      offset: 0,
      limit: 650
    }
    async function fetchData () { // Generation V 0-650
      try {
        const PokemonList = await P.getPokemonsList(interval)
        const nameList = PokemonList.results.map(data => data.name)
        if (!ignore) {
          setList(nameList)
          console.log('3')
        }
      } catch (error) {
        console.log(error)
      }
    }
    let ignore = false
    fetchData()
    console.log('1')
    return () => { ignore = true }
  }, [])

  return list
}

export default FetchNameList
