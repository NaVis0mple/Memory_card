import { useState, useEffect } from 'react'
import customOptions from './customOptions'
import { Pokedex } from 'pokeapi-js-wrapper'

function FetchGif ({ data, inputValue, setInputValue, name, setName }) {
  const P = new Pokedex(customOptions)
  const [imgUrl, setImgUrl] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRandomGIF () {
      try {
        setLoading(true)
        const api = await P.getPokemonByName(name)
        const gif = api.sprites.versions['generation-v']['black-white'].animated.front_default
        if (!ignore) {
          setImgUrl(gif)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    let ignore = false
    fetchRandomGIF()

    return () => {
      ignore = true
    }
  }, [name])

  return (
    <>
      {loading
        ? (<div className='p'>Loading...</div>)
        : (
          <img src={imgUrl} />)}

    </>
  )
}

export default FetchGif
