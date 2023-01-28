import { useState, FormEvent, useEffect } from 'react'
import { useModal } from '../../context/ModalContext'

import {
  Container,
  FormCustom,
  FormInput,
  ButtonsGroup,
  ButtonConfirm,
  ButtonCancel
} from './styles'

export function GiftForm() {
  const { setIsOpen } = useModal()
  const [isShowForm, setIsShowForm] = useState(false)
  const [name, setName] = useState('')

  function handleForm() {
    setIsShowForm(true)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Container>
      {isShowForm ? (
        <FormCustom action="" onSubmit={handleSubmit}>
          <span>Quem está presenteando?</span>
          <FormInput
            type="text"
            placeholder="Insira seu nome completo"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          {name.length > 5 && (
            <ButtonConfirm
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Confirmar
            </ButtonConfirm>
          )}
        </FormCustom>
      ) : (
        <>
          <span>Confirmar presente?</span>
          <ButtonsGroup>
            <ButtonConfirm onClick={handleForm}>Confirmar</ButtonConfirm>
            <ButtonCancel className="cancel">Cancelar</ButtonCancel>
          </ButtonsGroup>
        </>
      )}
    </Container>
  )
}
