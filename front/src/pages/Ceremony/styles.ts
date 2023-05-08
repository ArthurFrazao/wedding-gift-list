import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
  }

  span {
    width: 80%;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;

    margin-top: 12rem;

    .content {
      display: flex;
      flex-direction: column-reverse;

      gap: 1rem;
    }

    span {
      width: 100%;
    }
  }
`

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;

  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
  }

  ul {
    padding-left: 1rem;
  }
`
