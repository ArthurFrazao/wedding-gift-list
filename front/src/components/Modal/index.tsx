import React, { useEffect, useState } from 'react'
import { Heart, XCircle } from 'phosphor-react'

import { Button } from '../Button'

import { useModal } from '../../context/ModalContext'
import { useGift } from '../../context/GiftContext'

import { GiftProps } from '../../interfaces/props'

import { ContentActions, ModalWrapper, ModalCard, CloseButton } from './styles'

interface ModalProps {
  gift: GiftProps
  textButton: string
  children?: React.ReactNode
}

export function Modal({ gift, textButton, children }: ModalProps) {
  const { isOpen, setIsOpen, isWaiting } = useModal()
  const { setGiftSelected, setGiftNameSelected } = useGift()

  const [isShowing, setIsShowing] = useState(false)

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      setIsOpen(false)
    }
  })

  function toggle() {
    setIsOpen(!isShowing)
    setGiftSelected(gift?.id)
    setGiftNameSelected(gift?.name)
  }

  useEffect(() => {
    setGiftSelected(gift?.id)
    setGiftNameSelected(gift?.name)
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
      <ContentActions>
        <Button onClick={toggle} disabled={gift?.is_presented}>
          {textButton}
        </Button>
        <span>
          {gift?.is_presented && (
            <>
              Esse item nós já ganhamos!{' '}
              <Heart size={12} weight="fill" color="#c63c3c" />
            </>
          )}
        </span>
      </ContentActions>
      {isShowing && (
        <ModalWrapper cursorLoader={isWaiting}>
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
