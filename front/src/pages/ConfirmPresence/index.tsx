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
  const [inviteCount, setInviteCount] = useState(0)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const dataConfirmPresence = {
      id: idRepresentant,
      isConfirmed: true,
      namesInvitations: [
        {
          name: nameRepresentant,
          isConfirmed: true,
          age: 23
        }
      ]
    }

    console.log(dataConfirmPresence)

    // api
    //   .post('/confirm-presence', { body: dataConfirmPresence })
    //   .then(() => console.log(dataConfirmPresence))
    //   .catch(error => {
    //     console.error(error)
    //   })
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

    console.log()
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
          <FormLabel htmlFor="name">
            Nome completo: <b>*</b>
          </FormLabel>
          <Autocomplete
            id="representant"
            options={isListingGuests}
            onChange={event => {
              setIdRepresentant(event?.id)
              setNameRepresentant(event?.name)
              console.log(event?.id)
            }}
            placeholder="Digite seu nome completo..."
          />

          <FormLabel htmlFor="invitations">
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput
            type="number"
            value={inviteCount}
            onChange={event => setInviteCount(Number(event.target.value))}
            required
            disabled
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </PageDefault>
  )
}
