import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ArrowLeft, Gift } from 'phosphor-react'

import { Container, ReturnPage } from './styles'

export function returnPage() {
  const handleBack = () => {
    window.history.back()
  }
  return (
    <ReturnPage role="button" onClick={() => handleBack()}>
      <ArrowLeft size={16} />
      <span>Voltar</span>
    </ReturnPage>
  )
}

export function Header() {
  const location = useLocation()
  const currentPage = location.pathname

  const [showArrowBack, setShowArrowBack] = useState(false)

  useEffect(() => {
    currentPage === '/home' && setShowArrowBack(true)
  }, [location])

  return (
    <Container>
      <div className="title__gift">
        {showArrowBack ? (
          <>
            <Gift size={40} />
            <span>
              Lista de <br /> <b>Presentes</b>
            </span>
          </>
        ) : (
          returnPage()
        )}
      </div>

      <Link to="/home">
        <h4 className="engaged" role="button">
          Nathalia & Arthur
        </h4>
      </Link>
    </Container>
  )
}
