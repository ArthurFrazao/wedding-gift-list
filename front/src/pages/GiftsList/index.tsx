import { useState, useEffect } from 'react'
import { CardGift } from '../../components/CardGift'

import { FilterSearch } from '../../components/FilterSearch'
import { PageDefault } from '../../components/PageDefault'

import { GiftProps } from '../../interfaces/props'
import { dataGifts } from '../../mocks/gifts'

import { Container } from './styles'

export function GiftsList() {
  const [gifts, setGifts] = useState<GiftProps[]>([])

  useEffect(() => {
    setGifts(dataGifts)
  })
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

        <div className="listing">
          {gifts?.map(gift => (
            <CardGift key={gift.id} dataGift={gift} />
          ))}
        </div>
      </Container>
    </PageDefault>
  )
}
