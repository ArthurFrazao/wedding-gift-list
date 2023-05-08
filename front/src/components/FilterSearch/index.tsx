import { useState, useEffect, ChangeEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../Button'

import { Container, ContainerMobile } from './styles'

interface FilterSearchProps {
  searchAll?: () => void
  searchNotPresented?: () => void
  filterInput?: ChangeEventHandler<HTMLInputElement>
}

function Mobile(props: FilterSearchProps) {
  const navigate = useNavigate()
  const redirectToAddSuggestion = (url: string) => {
    navigate(url)
  }

  return (
    <ContainerMobile>
      <div className="group__buttons">
        <Button onClick={props.searchAll}>Todos os itens</Button>
        <Button onClick={props.searchNotPresented}>
          Itens não presenteados
        </Button>
      </div>

      <section className="filter">
        <div className="field__search">
          <input
            type="text"
            placeholder="Buscar presente pelo nome"
            onChange={props.filterInput}
          />
        </div>
        <Button
          onClick={() =>
            redirectToAddSuggestion('/category/gift-list/add-suggestion')
          }
        >
          Adicionar sugestão
        </Button>
      </section>
    </ContainerMobile>
  )
}

function Desktop(props: FilterSearchProps) {
  const navigate = useNavigate()
  const redirectToAddSuggestion = (url: string) => {
    navigate(url)
  }
  return (
    <Container>
      <div>
        <Button onClick={props.searchAll}>Todos os itens</Button>
        <Button onClick={props.searchNotPresented}>
          Itens não presenteados
        </Button>
      </div>

      <section className="filter">
        <Button
          onClick={() =>
            redirectToAddSuggestion('/category/gift-list/add-suggestion')
          }
        >
          Adicionar sugestão
        </Button>
        <input
          type="text"
          placeholder="Buscar presente pelo nome"
          onChange={props.filterInput}
        />
      </section>
    </Container>
  )
}

export function FilterSearch({
  searchAll,
  searchNotPresented,
  filterInput
}: FilterSearchProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  return (
    <>
      {isMobile ? (
        <Mobile
          searchAll={searchAll}
          searchNotPresented={searchNotPresented}
          filterInput={filterInput}
        />
      ) : (
        <Desktop
          searchAll={searchAll}
          searchNotPresented={searchNotPresented}
          filterInput={filterInput}
        />
      )}
    </>
  )
}
