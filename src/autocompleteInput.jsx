import { useEffect, useRef, useState } from 'react'

function AutocompleteInput ({ data, inputValue, setInputValue }) {
  const [suggestion, setSuggestion] = useState([])
  const [suggestionClicked, setSuggestionClicked] = useState(false)
  const ref = useRef()

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setSuggestionClicked(false)

    const filterData = data.filter((item) => item.startsWith(value.toLowerCase()))
    setSuggestion(filterData)
  }

  const handleSuggestionAction = (suggestion) => {
    setInputValue(suggestion)
    setSuggestionClicked(true)
  }
  // click outside of div ,close list
  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target)) {
      setSuggestionClicked(true)
    }
  }
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  })

  return (
    <div ref={ref} id='input'>
      <input value={inputValue} onChange={handleInputChange} />
      <ul>
        {suggestionClicked
          ? null
          : (
              suggestion.map((suggestion) => (
                <li key={suggestion} onClick={() => handleSuggestionAction(suggestion)}>
                  {suggestion}
                </li>
              )))}
      </ul>
    </div>
  )
}

export default AutocompleteInput
