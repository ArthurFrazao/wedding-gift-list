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
        <span>
          Informações importantes para aparelhos eletronicos e eletrodomesticos:
        </span>
      </header>

      <span>
        {' '}
        <strong>Voltagem:</strong> 220V{' '}
      </span>
      <span>
        {' '}
        <strong>Preferência de cor:</strong> Preto ou Inox
      </span>

      <span className="footer">
        <strong>*</strong> Caso o item escolhido ou sugerido seja panelas e
        afins, pedimos que atente-se pois o nosso fogão é de indução e necessita
        de panelas específicas. <strong>*</strong>
      </span>
    </Header>
  )
}

export function GiftForm() {
  const { giftSelected, giftNameSelected } = useGift()
  const { setIsOpen, setIsWaiting } = useModal()

  const [name, setName] = useState('')
  const [optionalMessage, setOptionalMessage] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  async function handleForm() {
    setIsWaiting(true)
    setIsSubmitted(true)

    try {
      await api
        .post('/update-gift-status', {
          id: giftSelected,
          name,
          optionalMessage
        })
        .then(() =>
          toast.success('Boa escolha! Te agradecemos muito pelo presente ❤️')
        )
        .catch(() => toast.warn('Ops! Algo deu errado. 😥'))

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
        <ButtonConfirm
          onClick={handleForm}
          disabled={name.length < 5 || isSubmitted}
        >
          Confirmar
        </ButtonConfirm>
        <ButtonCancel onClick={() => setIsOpen(false)} className="cancel">
          Cancelar
        </ButtonCancel>
      </ButtonsGroup>
    </Container>
  )
}
