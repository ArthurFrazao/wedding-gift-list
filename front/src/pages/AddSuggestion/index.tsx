import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { Button } from '../../components/Button'
import { PageDefault } from '../../components/PageDefault'

import { FormInput, FormLabel } from '../ConfirmPresence/styles'
import { Container, SelectOption } from './styles'

import 'react-toastify/dist/ReactToastify.css'
import api from '../../services/api'
import { ImportantInformations } from '../../components/GiftForm'

interface FormValues {
  name: string
  namePerson: string
  file?: File
  selectedOption: SelectOption
}

type SelectOption = '' | 'sim' | 'não'

export function AddSuggestion() {
  const [isRedirect, setIsRedirect] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption>('')
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    namePerson: '',
    selectedOption: '',
    file: undefined
  })

  const navigate = useNavigate()

  const description = `<span>Bem-vindo à nossa página de sugestões de presentes para o casal! <br /><br /> Sabemos que cada casal é único e tem gostos e preferências diferentes. Por isso, estamos abertos a todas as sugestões de presentes que vocês possam ter! Seja algo personalizado e feito à mão, algo útil e prático, ou mesmo algo mais luxuoso e sofisticado, queremos ouvir todas as suas ideias.<span>`

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFormValues(prevState => ({
      ...prevState,
      name: value
    }))
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedOption(value as SelectOption)
    setFormValues(prevState => ({
      ...prevState,
      selectedOption: value as SelectOption
    }))
  }

  const handleNamePersonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setFormValues(prevState => ({
      ...prevState,
      namePerson: value
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
      formData.append('namePerson', formValues.namePerson)
      formData.append('selectedOption', formValues.selectedOption)

      if (formValues.file) {
        formData.append('file', formValues.file)
      }

      const response = await api.post('/give-suggestion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)

      toast.success('Sugestão adicionada! Agradecemos muito ❤️')

      setTimeout(() => {
        setIsRedirect(true)
      }, 3000)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    isRedirect && navigate('/category/gift-list')
  }, [isRedirect])

  return (
    <PageDefault>
      <Container>
        <h1>Adicionar Sugestão</h1>

        <span
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {selectedOption === 'sim' && <ImportantInformations />}

        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">
            Nome do item: <b>*</b>
          </FormLabel>
          <FormInput
            type="text"
            id="name"
            placeholder="Digite o nome do item sugerido"
            value={formValues.name}
            onChange={handleNameChange}
            required
          />

          <FormLabel htmlFor="simple-select">
            É você quem está presenteando? <b>*</b>
          </FormLabel>
          <SelectOption
            id="simple-select"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">-- Selecione uma opção --</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </SelectOption>

          {selectedOption === 'sim' && (
            <>
              <FormLabel htmlFor="namePerson">
                Quem está presenteando? <b>*</b>
              </FormLabel>
              <FormInput
                type="text"
                id="namePerson"
                placeholder="Digite seu nome completo"
                value={formValues.namePerson}
                onChange={handleNamePersonChange}
                required
              />
            </>
          )}

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
