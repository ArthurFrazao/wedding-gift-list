import { useState, useEffect } from 'react'
import { FadersHorizontal } from 'phosphor-react'

import { Button } from '../Button'

import { Container, ContainerMobile } from './styles'

interface FilterSearchProps {
  searchAll?: () => void
  searchNotPresented?: () => void
}

function Mobile(props: FilterSearchProps) {
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
          <input type="text" placeholder="Buscar presente pelo nome" />
          <span role="button">
            <FadersHorizontal size={32} />
          </span>
        </div>
        <Button>Adicionar sugestão</Button>
      </section>
    </ContainerMobile>
  )
}

function Desktop(props: FilterSearchProps) {
  return (
    <Container>
      <div>
        <Button onClick={props.searchAll}>Todos os itens</Button>
        <Button onClick={props.searchNotPresented}>
          Itens não presenteados
        </Button>
      </div>

      <section className="filter">
        <Button>Adicionar sugestão</Button>
        <input type="text" placeholder="Buscar presente pelo nome" />
        <span role="button">
          <FadersHorizontal size={32} />
        </span>
      </section>
    </Container>
  )
}

export function FilterSearch({
  searchAll,
  searchNotPresented
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
        <Mobile searchAll={searchAll} searchNotPresented={searchNotPresented} />
      ) : (
        <Desktop
          searchAll={searchAll}
          searchNotPresented={searchNotPresented}
        />
      )}
    </>
  )
}
