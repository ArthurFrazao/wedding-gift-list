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

  const description = `<span>Sua presença em nosso casamento já é muito importante para nós, mas... caso queira nos ajudar a montar nossa casa nova e realizar nosso sonho, ficaríamos imensamente agradecidos e felizes. <br> 
  <br>
  Abaixo, listamos algumas sugestões de presentes que adoraríamos ganhar. Fique à vontade para buscar os produtos em quaisquer lojas e/ou sites com os quais esteja familiarizado ou costuma comprar.
  Além disso, é possível adicionar uma sugestão de presente clicando no botão <strong>Adicionar sugestão</strong>. Você também pode filtrar os presentes e selecionar apenas aqueles que ainda não foram escolhidos. 
  Agradecemos seu carinho e generosidade, e não se esqueça de confirmar sua presença em nossa cerimônia na aba <strong>Confirmar Presença</strong> no menu inicial. Sua presença será muito importante para tornar nosso dia ainda mais especial. </span>`

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
