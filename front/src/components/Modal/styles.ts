import styled from 'styled-components'

interface ModalProps {
  cursorLoader?: boolean
}

export const ContentActions = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
`

export const ModalWrapper = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${props => (props.cursorLoader ? 'wait' : 'default')};

  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
`

export const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: white;
  padding: 1rem;
  border-radius: 0.3125rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`

export const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;

  cursor: pointer;
`
