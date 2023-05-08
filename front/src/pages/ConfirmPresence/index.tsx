import { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { PageDefault } from '../../components/PageDefault'

import api from '../../services/api'

import {
  Container,
  FormInput,
  FormLabel,
  Autocomplete,
  CustomInputMask
} from './styles'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormEvent = React.FormEvent<HTMLFormElement>

export function ConfirmPresence() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [description, setDescription] = useState<string>('')

  const [idRepresentant, setIdRepresentant] = useState<number>(0)
  const [invitations, setInvitations] = useState<number>(0)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [optionalMessage, setOptionalMessage] = useState<string>('')

  const [isListingGuests, setIsListingGuests] = useState([])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setOptionalMessage(event.target.value)
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
      is_confirmed: true,
      phone_number: phoneNumber,
      optional_message: optionalMessage
    }

    try {
      api
        .post('/confirm-presence', confirmPresence, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          toast.success('Presença confirmada! Esperamos você ❤️', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })

          setTimeout(() => {
            location.reload()
          }, 3000)
        })
    } catch (error) {
      toast.warn('Ops! Algo deu errado. 😥', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
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
              setInvitations(event?.invitations)
            }}
            placeholder="Digite seu nome completo..."
            required
          />

          <FormLabel htmlFor="invitations">
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput type="number" value={invitations} disabled />

          <FormLabel htmlFor="phoneNumber">
            Telefone: <b>*</b>
          </FormLabel>
          <CustomInputMask
            id="phone"
            mask="(99) 99999-9999"
            maskChar=""
            placeholder="(00) 00000-0000"
            onChange={event => setPhoneNumber(event.target.value)}
            required
          />

          <FormLabel htmlFor="optionalMessage">
            Deixe uma mensagem aqui: <strong>(opcional)</strong>
          </FormLabel>
          <FormInput
            type="text"
            value={optionalMessage}
            onChange={handleInputChange}
          />

          <Button type="submit">Enviar</Button>
          <ToastContainer />
        </form>
      </Container>
    </PageDefault>
  )
}
