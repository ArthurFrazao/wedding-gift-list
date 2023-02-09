import { useState, useEffect } from 'react'

import { useGift } from '../../context/GiftContext'
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

  const [name, setName] = useState('')

  async function handleForm() {
    try {
      const response = await api.post('/update-gift-status', {
        id: giftSelected,
        name: name
      })

      console.log(response.data)

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
        <ButtonCancel className="cancel">Cancelar</ButtonCancel>
      </ButtonsGroup>
    </Container>
  )
}
