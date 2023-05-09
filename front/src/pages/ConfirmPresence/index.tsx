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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [idRepresentant, setIdRepresentant] = useState<number>(0)
  const [invitations, setInvitations] = useState<number>(0)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [optionalMessage, setOptionalMessage] = useState<string>('')

  const [isListingGuests, setIsListingGuests] = useState([])

  const messageGenericError = 'Ops! Algo deu errado. 😥'
  const alreadyConfirmedError = 'Você já confirmou sua presença. 😃'

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setOptionalMessage(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)

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
        .then(() => {
          toast.success('Presença confirmada! Esperamos você ❤️')

          setTimeout(() => {
            location.reload()
          }, 3000)
        })
        .catch(error => {
          error.response.data.error === 'Presence already confirmed'
            ? toast.info(alreadyConfirmedError)
            : toast.error(messageGenericError)

          setIsSubmitted(false)
        })
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

        <span>
          Bem-vindo à nossa página de confirmação de presença para o nosso
          casamento!
          <br />
          <br />
          Aqui é um espaço dedicado para que nossos convidados possam nos
          informar se estarão presentes em nosso casamento. Além disso, você
          pode visualizar quantos convites estarão disponíveis para você e é
          possível nos dar detalhes adicionais, se necessário. Sua presença é
          muito importante para nós e, por isso, agradecemos por reservar um
          tempo para nos informar sobre sua participação em nosso grande dia.
        </span>

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

          <Button type="submit" disabled={isSubmitted}>
            Enviar
          </Button>
          <ToastContainer />
        </form>
      </Container>
    </PageDefault>
  )
}
