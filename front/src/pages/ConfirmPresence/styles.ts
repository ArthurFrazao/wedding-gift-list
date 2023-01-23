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

  .content,
  form {
    width: 100%;
  }

  input {
    height: 2rem;
    width: 100%;

    padding: 0 10px;

    border: none;
    border-radius: 0.5rem;
  }
`
