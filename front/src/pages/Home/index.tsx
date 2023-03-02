import { useEffect, useState } from 'react'

import { Loader } from '../../components/Loader'
import { HeroCard } from '../../components/HeroCard'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

import { ContentLoveStory } from './styles'

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>('')

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

  useEffect(() => {
    listDescription()
  }, [])

  if (isLoading) return <Loader />

  return (
    <div>
      <PageDefault>
        <HeroCard description={description} />

        <ContentLoveStory>
          <h2>Nossa história de amor</h2>

          <div className="itens">
            <div className="item">
              <span>15/02/2020</span>
              <span className="title">Nos conhecemos</span>
              <span className="description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci rem velit minus unde doloribus voluptates eveniet.
              </span>
            </div>

            <div className="item">
              <span>15/02/2020</span>
              <span className="title">Começamos a namorar</span>
              <span className="description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci rem velit minus unde doloribus voluptates eveniet.
              </span>
            </div>

            <div className="item">
              <span>15/02/2020</span>
              <span className="title">Noivamos</span>
              <span className="description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci rem velit minus unde doloribus voluptates eveniet.
              </span>
            </div>
          </div>
        </ContentLoveStory>
      </PageDefault>
    </div>
  )
}
