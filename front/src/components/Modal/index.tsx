import React, { useEffect, useState } from 'react'
import { Heart, XCircle } from 'phosphor-react'

import { Button } from '../Button'
import { useModal } from '../../context/ModalContext'
import { useGift } from '../../context/GiftContext'

import { GiftProps } from '../../interfaces/props'

import { ModalWrapper, ModalCard, CloseButton } from './styles'

interface ModalProps {
  gift: GiftProps
  textButton: string
  children?: React.ReactNode
}

export function Modal({ gift, textButton, children }: ModalProps) {
  const { isOpen, setIsOpen } = useModal()
  const { setGiftSelected } = useGift()

  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsOpen(!isShowing)
    setGiftSelected(gift?.id)
  }

  useEffect(() => {
    setGiftSelected(gift?.id)
  }, [gift])

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }, [isOpen])

  return (
    <>
      <Button onClick={toggle} disabled={gift?.is_presented}>
        {textButton}
      </Button>
      {gift?.is_presented && (
        <span>
          Esse item nós já ganhamos!{' '}
          <Heart size={12} weight="fill" color="#c63c3c" />
        </span>
      )}
      {isShowing && (
        <ModalWrapper>
          <ModalCard>
            <CloseButton onClick={toggle}>
              <XCircle size={32} color="#91b696" />
            </CloseButton>
            {children}
          </ModalCard>
        </ModalWrapper>
      )}
    </>
  )
}
