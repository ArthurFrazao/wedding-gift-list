import styled from 'styled-components'

interface ButtonProps {
  disabled?: boolean
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
  padding: 0.5rem 1rem;
  width: fit-content;

  color: #fff;
  font-family: 'Lato', sans-serif;
  border: none;
  border-radius: 0.5rem;
  background: ${({ disabled }) => (disabled ? '#ccc' : 'var(--blue)')};
  transition: 0.2s;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    filter: brightness(0.8);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.125rem;
  }
`
