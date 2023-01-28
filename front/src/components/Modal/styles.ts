import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`

export const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;

  cursor: pointer;
`
