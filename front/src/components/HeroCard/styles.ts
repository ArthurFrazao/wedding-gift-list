import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  justify-items: stretch;

  height: 80vh;

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 1rem;
    color: var(--black);

    h2 {
      font-size: 2rem;
    }
  }
`
