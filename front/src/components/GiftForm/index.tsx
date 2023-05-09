import { useState } from 'react'
import { WarningCircle } from 'phosphor-react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGift } from '../../context/GiftContext'
import { useModal } from '../../context/ModalContext'

import api from '../../services/api'

import {
  Container,
  FormCustom,
  Header,
  FormInput,
  ButtonsGroup,
  ButtonConfirm,
  ButtonCancel
} from './styles'

export function ImportantInformations() {
  return (
    <Header>
      <header>
        <WarningCircle size={32} color="#c63c3c" />
        <span>Informações importantes:</span>
      </header>

      <span>
        {' '}
        <strong>Voltagem:</strong> 220V{' '}
      </span>
      <span>
        {' '}
        <strong>Preferência de cor:</strong> Preto ou Inox
      </span>
    </Header>
  )
}

export function GiftForm() {
  const { giftSelected, giftNameSelected } = useGift()
  const { setIsOpen, setIsWaiting } = useModal()

  const [name, setName] = useState('')
  const [optionalMessage, setOptionalMessage] = useState<string>('')

  async function handleForm() {
    setIsWaiting(true)

    try {
      await api
        .post('/update-gift-status', {
          id: giftSelected,
          name,
          optionalMessage
        })
        .then(() =>
          toast.success('Boa escolha! Te agradecemos muito pelo presente ❤️', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        )
        .catch(() =>
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
        )

      setTimeout(() => {
        location.reload()
      }, 3000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <FormCustom>
        <h3>Você selecionou {giftNameSelected}, correto?</h3>
        <ImportantInformations />

        <span>
          Quem está presenteando? <b>*</b>
        </span>
        <FormInput
          type="text"
          placeholder="Insira seu nome completo"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />

        <span>
          Deixe aqui uma mensagem para os noivos <strong>(opcional)</strong>
        </span>
        <FormInput
          type="text"
          placeholder=""
          value={optionalMessage}
          onChange={event => setOptionalMessage(event.target.value)}
        />

        <ToastContainer />
      </FormCustom>
      <ButtonsGroup>
        <ButtonConfirm onClick={handleForm} disabled={name.length < 5}>
          Confirmar
        </ButtonConfirm>
        <ButtonCancel onClick={() => setIsOpen(false)} className="cancel">
          Cancelar
        </ButtonCancel>
      </ButtonsGroup>
    </Container>
  )
}
