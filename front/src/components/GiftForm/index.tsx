import { useState } from 'react'

import { useGift } from '../../context/GiftContext'
import { useModal } from '../../context/ModalContext'

import api from '../../services/api'

import {
  Container,
  FormCustom,
  FormInput,
  ButtonsGroup,
  ButtonConfirm,
  ButtonCancel
} from './styles'

export function GiftForm() {
  const { giftSelected } = useGift()
  const { setIsOpen, setIsWaiting } = useModal()

  const [name, setName] = useState('')

  async function handleForm() {
    setIsWaiting(true)

    try {
      await api.post('/update-gift-status', {
        id: giftSelected,
        name: name
      })

      setTimeout(() => {
        location.reload()
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <FormCustom>
        <span>Quem está presenteando?</span>
        <FormInput
          type="text"
          placeholder="Insira seu nome completo"
          value={name}
          onChange={event => setName(event.target.value)}
        />
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
