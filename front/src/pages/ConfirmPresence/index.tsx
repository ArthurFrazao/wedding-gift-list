import { useState } from 'react'
import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import { Container, FormInput, FormLabel } from './styles'

export function ConfirmPresence() {
  const [fullName, setFullName] = useState('')
  const [inviteCount, setInviteCount] = useState(0)
  const [telephone, setTelephone] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <PageDefault>
      <Container>
        <h1>Confirmar presença</h1>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            Nome completo: <b>*</b>
          </FormLabel>
          <FormInput
            type="text"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            required
          />

          <FormLabel>
            Quantidade de convites: <b>*</b>
          </FormLabel>
          <FormInput
            type="number"
            value={inviteCount}
            onChange={event => setInviteCount(Number(event.target.value))}
            required
          />

          <FormLabel>
            Telefone: <b>*</b>
          </FormLabel>
          <FormInput
            type="tel"
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            required
          />

          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </PageDefault>
  )
}
