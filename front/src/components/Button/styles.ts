import styled from 'styled-components'

interface ButtonProps {
  disabled?: boolean
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 8px;
  padding: 8px 16px;
  width: fit-content;

  color: #fff;
  font-family: 'Lato', sans-serif;
  border: none;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? '#ccc' : 'var(--blue)')};
  transition: 0.2s;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    filter: brightness(0.8);
  }
`
