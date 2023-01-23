import { useState, useEffect } from 'react'

import { Loader } from '../../components/Loader'
import { CardGift } from '../../components/CardGift'
import { PageDefault } from '../../components/PageDefault'
import { FilterSearch } from '../../components/FilterSearch'

import { GiftProps } from '../../interfaces/props'
import api from '../../services/api'

import { Container } from './styles'

export function GiftsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gifts, setGifts] = useState<GiftProps[]>([])

  useEffect(() => {
    api
      .get('/gift-all')
      .then(response => {
        setGifts(response.data)
        setIsLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <PageDefault>
      <Container>
        <h1>Lista de presentes</h1>
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
          voluptatibus commodi perferendis error harum sint facilis dolorem quod
          amet tempora delectus debitis explicabo voluptate tempore eligendi
          doloribus eius, labore iusto?
        </span>
        <FilterSearch />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="listing">
            {gifts?.map(gift => (
              <CardGift key={gift.id} dataGift={gift} />
            ))}
          </div>
        )}
      </Container>
    </PageDefault>
  )
}
