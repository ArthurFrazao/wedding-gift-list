import { useState, useEffect } from 'react'

import { PageDefault } from '../../components/PageDefault'

import { Container, Description } from './styles'

const redirectMessageArthur =
  'https://api.whatsapp.com/send?phone=5534992440811&text=Ol%C3%A1,%20obrigado%20por%20entrar%20em%20contato!%20Estou%20ansioso%20para%20conversar%20com%20voc%C3%AA.%20Por%20favor,%20me%20envie%20suas%20perguntas%20ou%20coment%C3%A1rios,%20e%20eu%20responderei%20assim%20que%20puder.%20Obrigado%20e%20tenha%20um%20%C3%B3timo%20dia!'

const redirectMessageNathalia =
  'https://api.whatsapp.com/send?phone=5534992677634&text=Ol%C3%A1,%20obrigada%20por%20entrar%20em%20contato!%20Estou%20ansiosa%20para%20conversar%20com%20voc%C3%AA.%20Por%20favor,%20me%20envie%20suas%20perguntas%20ou%20coment%C3%A1rios,%20e%20eu%20responderei%20assim%20que%20puder.%20Obrigado%20e%20tenha%20um%20%C3%B3timo%20dia!'

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
          <Description>
            <div className="item">
              <h2>Local da Cerimônia</h2>
              <span>
                A cerimônia será realizada na <b>Chácara Pingo de Ouro</b> ,
                localizada em{' '}
                <b>
                  R. dos Pinheiros, 789 - Panorama, Uberlândia - MG, 38412-606{' '}
                </b>
                , um espaço encantador e romântico que certamente proporcionará
                um cenário mágico para o casamento. Este local é a escolha
                perfeita para tornar este momento ainda mais especial. <br />{' '}
                Para sua comodidade, disponibilizamos um mapa nesta mesma página
                detalhando do local da cerimônia.
              </span>
            </div>

            <div className="item">
              <h2>Data e Horário</h2>
              <span>
                A cerimônia será no dia <b>09/09/2023</b> (9 de setembro de
                2023) às <b>16h</b> . Pedimos que todos os convidados cheguem
                com antecedência para que possamos iniciar a cerimônia
                pontualmente.
              </span>
            </div>

            <div className="item">
              <h2>Informações Adicionais</h2>
              <span>
                Fiquem à vontade para navegar em nosso site e conferir mais
                informações sobre a cerimônia, bem como confirmar a sua presença
                e sugestões de presentes para os noivos.
              </span>
            </div>

            <div className="item">
              <h2>Contato</h2>
              <span>
                Estamos ansiosos para compartilhar esse dia especial com vocês!
                Qualquer dúvida ou informação adicional, por favor, entre em
                contato conosco através do nosso WhatsApp:
              </span>

              <ul>
                <li>
                  <strong>Arthur:</strong> -{' '}
                  <a href={redirectMessageArthur} target="_blank">
                    [Clique aqui para enviar uma mensagem]
                  </a>
                </li>
                <li>
                  <strong>Nathalia</strong> -{' '}
                  <a href={redirectMessageNathalia} target="_blank">
                    [Clique aqui para enviar uma mensagem]
                  </a>
                </li>
              </ul>
            </div>
          </Description>
        </div>
      </Container>
    </PageDefault>
  )
}
