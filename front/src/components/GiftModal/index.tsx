import { useEffect, useState } from 'react'

import { Loader } from '../Loader'

import { useGift } from '../../context/GiftContext'
import api from '../../services/api'

import { Container } from './styles'

interface LinksGiftProps {
  id: number
  url: string
  store: string
}

export function GiftModal() {
  const { giftSelected } = useGift()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [linksGift, setLinksGift] = useState<LinksGiftProps[]>([])

  async function getLinksGift() {
    setIsLoading(true)
    try {
      const response = await await api.get(`/get-gift-link/${giftSelected}`)

      console.log(response, 'response')
      const listLinks = response.data

      setLinksGift(listLinks)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getLinksGift()
  }, [])

  return (
    <Container>
      <h3>
        Aqui abaixo estão algumas sugestões de sites que possuem este presente:
      </h3>

      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {linksGift.map(gift => (
            <li>
              <b>{gift?.store}: </b>
              <a href={gift.url} target="_blank" rel="noopener noreferrer">
                Clique aqui para acessar o site.
              </a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
