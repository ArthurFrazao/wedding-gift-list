import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Ceremony } from './Ceremony'
import { GiftsList } from './GiftsList'

import { PageDefault } from '../../components/PageDefault'

import { Container } from './styles'

const RenderCategory = {
  'gift-list': <GiftsList />,
  'info-ceremony': <Ceremony />,
  'confirm-presence': <h1>Confirme sua presença</h1>
}

export function Category() {
  const { category } = useParams()

  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    switch (category) {
      case 'gift-list':
        setTitle('Lista de Presentes')
        break
      case 'ceremony':
        setTitle('Cerimônia')
        break
      case 'confirm-presence':
        setTitle('Confirme sua presença')
        break

      default:
        setTitle('Página não encontrada')
    }
  }, [])

  return (
    <PageDefault>
      <Container>
        <h1>{title}</h1>

        {/* @ts-ignore */}
        {RenderCategory[category]}
      </Container>
    </PageDefault>
  )
}
