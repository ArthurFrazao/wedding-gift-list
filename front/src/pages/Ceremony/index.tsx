import { useState, useEffect } from 'react'

import { PageDefault } from '../../components/PageDefault'
import { Loader } from '../../components/Loader'

import { Container } from './styles'

import api from '../../services/api'

export function Ceremony() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState(false)

  const [description, setDescription] = useState<string>('')

  const verifyIsMobile = () => {
    window.screen.width <= 768 ? setIsMobile(true) : setIsMobile(false)
  }

  async function getDescription() {
    setIsLoading(true)
    try {
      const response = await await api.get('/get-page-description/ceremony')
      const description = response.data

      setDescription(description)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    verifyIsMobile()
    getDescription()
  }, [window.screen])

  const MapGoogle = (): JSX.Element => {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.274145559556!2d-48.35572998459704!3d-18.963496413879195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a44323c35d5fdd%3A0xd2502675db5406e6!2sR.%20dos%20Pinheiros%2C%20789%20-%20Panorama%2C%20Uberl%C3%A2ndia%20-%20MG%2C%2038412-606!5e0!3m2!1sen!2sbr!4v1674090903591!5m2!1sen!2sbr"
        width={isMobile ? '100%' : '600'}
        height={isMobile ? '250' : '450'}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    )
  }
  return (
    <PageDefault>
      <Container>
        <h1>Cerimônia</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="content">
            <MapGoogle />
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </Container>
    </PageDefault>
  )
}
