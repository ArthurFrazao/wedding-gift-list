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
  const [description, setDescription] = useState<string>('')

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

  async function listDescription() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-page-description/gift-list')
      const description = response.data

      setDescription(description)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
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
    listDescription()
    listAllGifts()
  }, [])

  return (
    <PageDefault>
      <Container>
        <h1>Lista de presentes</h1>
        <span dangerouslySetInnerHTML={{ __html: description }} />
        <FilterSearch
          searchAll={() => listAllGifts()}
          searchNotPresented={() => listGiftsNotPresented()}
          filterInput={event => {
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
