import { useEffect, useState } from 'react'

import { Loader } from '../../components/Loader'
import { HeroCard } from '../../components/HeroCard'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>('')

  async function listDescription() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-page-description/home')
      const description = response.data

      console.log(description)

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
      </PageDefault>
    </div>
  )
}
