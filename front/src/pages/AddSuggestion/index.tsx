import { ChangeEvent, FormEvent, useState } from 'react'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import { FormInput, FormLabel } from '../ConfirmPresence/styles'
import { Container } from './styles'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../services/api'

interface MyFormState {
  nameItem: string
  imageItem: File | null
}

export function AddSuggestion() {
  const [formState, setFormState] = useState<MyFormState>({
    nameItem: '',
    imageItem: null
  })

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, nameItem: event.target.value })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFormState({ ...formState, imageItem: file || null })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('nameItem', formState.nameItem)
    if (formState.imageItem) {
      formData.append(
        'imageItem',
        formState.imageItem,
        formState.imageItem.name
      )
    }

    try {
      await api.post('/upload-item', {
        body: formData
      })
      // const response = await console.log(response, 'formData')

      // This is the response to the request...
    } catch (error) {
      // Handle the request error...
      console.error(error)
    }
  }

  return (
    <PageDefault>
      <Container>
        <h1>Adicionar Sugestão</h1>

        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          aspernatur ex nam aliquid ut, minima reprehenderit voluptatem expedita
          eius deleniti accusantium consequuntur delectus! Aliquam quis esse
          error ducimus maxime quisquam.
        </span>

        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="itemName">
            Nome do item: <b>*</b>
          </FormLabel>
          <FormInput
            type="text"
            value={formState.nameItem}
            onChange={handleNameChange}
          />

          <FormLabel htmlFor="itemImage">
            Imagem do item: <strong>(opcional)</strong>
          </FormLabel>
          <input
            name="file"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />

          <Button type="submit">Enviar</Button>
          <ToastContainer />
        </form>
      </Container>
    </PageDefault>
  )
}
