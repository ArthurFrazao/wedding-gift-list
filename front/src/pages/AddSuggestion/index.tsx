import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import { FormInput, FormLabel } from '../ConfirmPresence/styles'
import { Container } from './styles'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../services/api'

interface FormValues {
  name: string
  file?: File
}

export function AddSuggestion() {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    file: undefined
  })

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFormValues(prevState => ({
      ...prevState,
      name: value
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files && files.length > 0) {
      setFormValues(prevState => ({
        ...prevState,
        file: files[0]
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', formValues.name)
      if (formValues.file) {
        formData.append('file', formValues.file)
      }

      const response = await api.post('/upload-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(response.data)
    } catch (error) {
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
          <FormLabel htmlFor="name">
            Nome do item: <b>*</b>
          </FormLabel>
          <FormInput
            type="text"
            id="name"
            value={formValues.name}
            onChange={handleNameChange}
            required
          />

          <FormLabel htmlFor="file">
            Imagem do item: <strong>(opcional)</strong>
          </FormLabel>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="file"
            onChange={handleFileChange}
          />

          <Button type="submit">Enviar</Button>
          <ToastContainer />
        </form>
      </Container>
    </PageDefault>
  )
}
