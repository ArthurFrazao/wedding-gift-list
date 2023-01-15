import { useState, useEffect } from 'react'
import axios from 'axios'

import { FilterSearch } from '../../../components/FilterSearch'
import { CategoryProps } from '../../../interfaces/props'

export function GiftsList() {
  const [gifts, setGifts] = useState<CategoryProps[]>([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/gift-all')
      .then(resp => setGifts(resp.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <FilterSearch />

      <div>
        {gifts?.map(gift => (
          <span>{gift.name}</span>
        ))}
      </div>
    </div>
  )
}
