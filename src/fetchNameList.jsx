import customOptions from './customOptions'
import { Pokedex } from 'pokeapi-js-wrapper'

async function fetchNameList () {
  const P = new Pokedex(customOptions)
  const interval = {
    offset: 0,
    limit: 650
  }
  // Generation V 0-650
  const PokemonList = await P.getPokemonsList(interval)
  const nameList = PokemonList.results.map(data => data.name)

  return nameList
}

export default fetchNameList
