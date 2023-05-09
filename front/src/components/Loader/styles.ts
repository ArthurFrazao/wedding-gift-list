import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Loading = styled.div`
  border: 0.25rem solid #f3f3f3;
  border-top: 0.25rem solid #3498db;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  animation: ${rotate} 1s linear infinite;
`
