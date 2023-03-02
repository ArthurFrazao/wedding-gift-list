import { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

import { Container, FormInput, FormLabel, Autocomplete } from './styles'

type FormEvent = React.FormEvent<HTMLFormElement>

export function ConfirmPresence() {
  const [idRepresentant, setIdRepresentant] = useState<number>(0)
  const [nameRepresentant, setNameRepresentant] = useState<string>('')
  const [isListingGuests, setIsListingGuests] = useState([])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const confirmPresence = {
      id_representant: idRepresentant,
      names_invitations: [
        {
          name: nameRepresentant,
          is_confirmed: true,
          age: idRepresentant
        }
      ]
    }

    try {
      api
        .post('/confirm-presence', confirmPresence, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log(response))
    } catch (error) {
      console.error(error)
    }
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

  return (
    <PageDefault>
      <Container>
        <h1>Confirmar presença</h1>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">
            Nome completo: <b>*</b>
          </FormLabel>
          <Autocomplete
            id="representant"
            options={isListingGuests}
            onChange={event => {
              // setIdRepresentant(event?.id)
              // setNameRepresentant(event?.name)
            }}
            placeholder="Digite seu nome completo..."
          />

          <FormLabel htmlFor="invitations">
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput type="number" disabled />
          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </PageDefault>
  )
}
