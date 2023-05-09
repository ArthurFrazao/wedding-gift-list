import { useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Loader } from '../../components/Loader'
import { HeroCard } from '../../components/HeroCard'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'
import { LoveStoryProps } from '../../interfaces/props'

import { ContentLoveStory } from './styles'

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stepsLoveStory, setStepsLoveStory] = useState<LoveStoryProps[]>([])

  async function getDetailsLoveStory() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-love-story')
      const itemsLoveStory = response.data

      setStepsLoveStory(itemsLoveStory)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDetailsLoveStory()
  }, [])

  if (isLoading) return <Loader />

  return (
    <PageDefault>
      <HeroCard />

      <ContentLoveStory>
        <h2>Nossa história de amor</h2>

        <div className="items">
          {stepsLoveStory.map(item => (
            <div className="item" key={item.id}>
              <span>
                {format(addDays(new Date(item.date), 1), 'dd/MM/yyyy ', {
                  locale: ptBR
                })}
              </span>

              <img src={item.icon_url} alt={`Ícone ${item.title}`} />
              <span className="title">{item.title}</span>
              <span className="description">{item.description}</span>
            </div>
          ))}
        </div>
      </ContentLoveStory>
    </PageDefault>
  )
}
