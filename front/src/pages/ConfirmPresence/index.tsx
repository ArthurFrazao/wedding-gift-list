import { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

import {
  Container,
  FormInput,
  FormLabel,
  Autocomplete,
  InputGuests
} from './styles'
import { Loader } from '../../components/Loader'

type FormEvent = React.FormEvent<HTMLFormElement>

export function ConfirmPresence() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>('')

  const [idRepresentant, setIdRepresentant] = useState<number>(0)
  const [nameRepresentant, setNameRepresentant] = useState<string>('')
  const [invitations, setInvitations] = useState<number>(0)
  const [namesOfGuests, setNamesOfGuests] = useState<string[]>([])

  const [isListingGuests, setIsListingGuests] = useState([])

  const [inputs, setInputs] = useState<string[]>([])

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const renderInputs = () => {
    const inputElements = []
    for (let i = 0; i < invitations; i++) {
      inputElements.push(
        <InputGuests
          type="text"
          value={namesOfGuests}
          onChange={event => console.log(event.target.value)}
          required
        />
      )
    }
    return inputElements
  }

  async function getDescription() {
    setIsLoading(true)
    try {
      const response = await await api.get(
        '/get-page-description/confirm-presence'
      )
      const description = response.data

      setDescription(description)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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

      formattedGuests.map((guest: any) => console.log(guest.id))

      setIsListingGuests(formattedGuests)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listAllGuests()
    getDescription()
  }, [])

  return (
    <PageDefault>
      <Container>
        <h1>Confirmar presença</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: description }} />
        )}

        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">
            Nome completo: <b>*</b>
          </FormLabel>
          <Autocomplete
            id="representant"
            options={isListingGuests}
            onChange={event => {
              // @ts-ignore
              setIdRepresentant(event?.id)
              // @ts-ignore
              setNameRepresentant(event?.name)
              // @ts-ignore
            }}
            placeholder="Digite seu nome completo..."
            required
          />

          <FormLabel htmlFor="invitations">
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput type="number" value={invitations} disabled />

          {invitations > 0 && (
            <FormLabel htmlFor="name">
              Conte-nos o nome das pessoas que irão com você. <b>*</b>
            </FormLabel>
          )}
          {renderInputs()}

          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </PageDefault>
  )
}
