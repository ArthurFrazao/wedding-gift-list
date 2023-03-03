import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  justify-items: stretch;

  height: 70vh;

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

  @media (max-width: 768px) {
    height: 100%;
    margin-top: 5rem;
    margin-bottom: 2rem;
    padding: 0 1rem;

    display: flex;
    flex-direction: column;

    h2 {
      margin-top: 2rem;
    }
  }
`
