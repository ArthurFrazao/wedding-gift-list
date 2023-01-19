import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .listing {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    margin: 2rem 0;
    gap: 2rem;
    width: 100%;
  }
`
