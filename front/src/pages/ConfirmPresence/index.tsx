import { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

import { Container, FormInput, FormLabel, Autocomplete } from './styles'

export function ConfirmPresence() {
  const [fullName, setFullName] = useState('')
  const [isListingGuests, setIsListingGuests] = useState([])
  const [inviteCount, setInviteCount] = useState(0)
  const [telephone, setTelephone] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  async function listAllGuests() {
    try {
      const response = await await api.get('/guests-representants ')
      const allGuests = response.data

      const formattedGuests = allGuests.map((guest: any) => {
        return {
          ...guest,
          value: guest.id,
          label: guest.name,
          invitations: guest.invitations
        }
      })

      setIsListingGuests(formattedGuests)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listAllGuests()
  }, [])

  const options = [
    { value: 'chocolate', name: 'Chocolate' },
    { value: 'strawberry', name: 'Strawberry' },
    { value: 'vanilla', name: 'Vanilla' }
  ]

  return (
    <PageDefault>
      <Container>
        <h1>Confirmar presença</h1>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            Nome completo: <b>*</b>
          </FormLabel>
          <Autocomplete
            options={isListingGuests}
            placeholder="Digite seu nome completo..."
          />

          <FormLabel>
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput
            type="number"
            value={inviteCount}
            onChange={event => setInviteCount(Number(event.target.value))}
            required
          />

          <FormLabel>
            Telefone: <b>*</b>
          </FormLabel>
          <FormInput
            type="tel"
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            required
          />

          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </PageDefault>
  )
}
