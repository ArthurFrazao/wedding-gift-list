import React, { FormEvent, useEffect, useState } from 'react'
import { XCircle } from 'phosphor-react'

import { Button } from '../Button'
import { useModal } from '../../context/ModalContext'

import { ModalWrapper, ModalCard, CloseButton } from './styles'

interface ModalProps {
  textButton: string
  children?: React.ReactNode
}

export function Modal({ textButton, children }: ModalProps) {
  const { isOpen, setIsOpen } = useModal()

  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
    setIsOpen(!isShowing)
  }

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }, [isOpen])

  return (
    <>
      <Button onClick={toggle}>{textButton}</Button>
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
