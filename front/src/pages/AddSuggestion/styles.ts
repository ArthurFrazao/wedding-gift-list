import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  span {
    margin-top: 1rem;
  }

  form {
    padding: 1.5rem 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
    gap: 0.25rem;
  }

  button {
    margin-top: 0.5rem;
  }
`
