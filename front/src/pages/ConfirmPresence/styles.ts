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

  b {
    color: var(--red);
  }

  .content,
  form {
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  button {
    margin-top: 2rem;
  }
`

export const FormInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 10px;

  text-align: start;
  color: var(--black);
  background: var(--white);
  border: none;
  border-radius: 0.5rem;
`

export const FormLabel = styled.label`
  margin: 0.5em;
  color: var(--black);
`
