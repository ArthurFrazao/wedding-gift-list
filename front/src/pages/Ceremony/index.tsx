import { useState, useEffect } from 'react'
import { PageDefault } from '../../components/PageDefault'
import { Container } from './styles'

export function Ceremony() {
  const [isMobile, setIsMobile] = useState(false)

  const verifyIsMobile = () => {
    window.screen.width <= 768 ? setIsMobile(true) : setIsMobile(false)
  }
  useEffect(() => {
    verifyIsMobile()
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

        <div className="content">
          <MapGoogle />
          <span>
            Contamos com a presença de todos vocês no momento em que nossa união
            será abençoada diante de Deus! A cerimônia será rápida e vamos ser
            extremamente pontuais. Dia 00 de setembro de 2023 as 16:00 na
            Chácara Pingo De Ouro.
            <br />
            <br />
            R. dos Pinheiros, 789 - Panorama, Uberlândia - MG, 38412-606
          </span>
        </div>
      </Container>
    </PageDefault>
  )
}
