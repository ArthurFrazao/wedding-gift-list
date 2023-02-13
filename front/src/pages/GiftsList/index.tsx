import { useState, useEffect } from 'react'

import { Loader } from '../../components/Loader'
import { GiftCard } from '../../components/GiftCard'
import { PageDefault } from '../../components/PageDefault'
import { FilterSearch } from '../../components/FilterSearch'

import { GiftProps } from '../../interfaces/props'
import api from '../../services/api'

import { Container } from './styles'

export function GiftsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gifts, setGifts] = useState<GiftProps[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const filteredGifts = gifts.filter(gift => {
        return gift.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      })

      setGifts(filteredGifts)
    } else {
      listAllGifts()
    }
  }

  async function listAllGifts() {
    setIsLoading(true)
    try {
      const response = await await api.get('/all-gifts')
      const allGifts = response.data

      setGifts(allGifts)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function listGiftsNotPresented() {
    setIsLoading(true)
    try {
      const response = await await api.get('/gifts-not-presented')
      const allGifts = response.data

      setGifts(allGifts)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    listAllGifts()
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
        <FilterSearch
          searchAll={() => listAllGifts()}
          searchNotPresented={() => listGiftsNotPresented()}
          filterInput={event => {
            console.log(event.target.value)
            handleInputChange(event)
          }}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="listing">
            {gifts?.map(gift => (
              <GiftCard key={gift.id} dataGift={gift} />
            ))}
          </div>
        )}
      </Container>
    </PageDefault>
  )
}
