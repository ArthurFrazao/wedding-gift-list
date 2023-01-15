import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 8px;
  padding: 8px 16px;
  width: fit-content;

  color: #fff;
  font-family: Inter, sans-serif;
  border-radius: 8px;
  background: var(--blue);
  transition: 0.2s;

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`
