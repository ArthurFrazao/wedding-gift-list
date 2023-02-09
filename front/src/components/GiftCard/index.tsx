import { useEffect, useState } from 'react'

import { Modal } from '../Modal'
import { GiftModal } from '../GiftModal'

import { GiftProps } from '../../interfaces/props'

import { Container } from './styles'
import { GiftForm } from '../GiftForm'

interface GiftCardProps {
  dataGift: GiftProps
}
export function GiftCard({ dataGift }: GiftCardProps) {
  const [giftImg, setGiftImg] = useState<string>('')

  useEffect(() => {
    setGiftImg(dataGift.image_url)
  }, [])

  return (
    <Container>
      <h3>{dataGift?.name}</h3>
      <img src={giftImg} alt="Imagem do Produto" />
      <Modal textButton="Presentear" gift={dataGift}>
        <GiftModal />
        <GiftForm />
      </Modal>
    </Container>
  )
}
