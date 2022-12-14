import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GIPHY_API

interface Props {
  keyword: string
}

const useGifFetch = ({ keyword }: Props) => {
  const [gifUrl, setGifUrl] = useState('')
  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(' ').join('')}&limmit=1`
        )
        const { data } = await response.json()
        setGifUrl(data[0]?.images?.downsized_medium?.url)
      } catch (error) {
        setGifUrl('https://giphy.com/embed/pxfmi3rjxYQvQUuazB')
      }
    })()
  }, [keyword])

  return gifUrl
}

export default useGifFetch
