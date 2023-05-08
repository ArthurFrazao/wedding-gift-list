import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { Loader } from '../../components/Loader'
import { HeroCard } from '../../components/HeroCard'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'
import { LoveStoryProps } from '../../interfaces/props'

import { ContentLoveStory, Divider } from './styles'
import ptBR from 'date-fns/locale/pt-BR'

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>('')
  const [stepsLoveStory, setStepsLoveStory] = useState<LoveStoryProps[]>([])

  async function listDescription() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-page-description/home')
      const description = response.data

      setDescription(description)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function getDetailsLoveStory() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-love-story')
      const itensLoveStory = response.data

      setStepsLoveStory(itensLoveStory)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    listDescription()
    getDetailsLoveStory()
  }, [])

  if (isLoading) return <Loader />

  return (
    <PageDefault>
      <HeroCard description={description} />

      {/* <Divider src="/assets/divider.svg" alt="Divider" /> */}

      <ContentLoveStory>
        <h2>Nossa história de amor</h2>

        <div className="items">
          {stepsLoveStory.map(item => (
            <div className="item" key={item.id}>
              <span>
                {format(new Date(item.date), 'dd/MM/yyyy ', {
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
