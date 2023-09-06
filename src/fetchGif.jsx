import { useState, useEffect } from 'react'
import customOptions from './customOptions'
import { Pokedex } from 'pokeapi-js-wrapper'
const P = new Pokedex(customOptions)

function FetchGif ({ data }) {
  const [imgUrl, setImgUrl] = useState('')
  function generateRandomName (list) {
    const random = Math.floor(Math.random() * 650)
    const name = list[random]
    return name
  }
  useEffect(() => {
    async function fetchRandomGIF () {
      if (data.length !== 650) return

      try {
        const api = await P.getPokemonByName(generateRandomName(data))
        const gif = api.sprites.versions['generation-v']['black-white'].animated.front_default
        if (!ignore) {
          setImgUrl(gif)
          console.log('2')
        }
      } catch (error) {
        console.log(error)
      }
    }
    let ignore = false
    fetchRandomGIF()
    console.log('4')
    return () => {
      ignore = true
    }
  }, [data])

  return (
    <img src={imgUrl} />
  )
}

export default FetchGif
