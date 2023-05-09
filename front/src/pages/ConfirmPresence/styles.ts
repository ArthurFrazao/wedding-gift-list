import styled from 'styled-components'
import Select from 'react-select'
import InputMask from 'react-input-mask'

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
    margin-top: 2rem;
  }

  button {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    h2 {
      margin-top: -6.25rem;
    }
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
  margin: 0.5rem;
  color: var(--black);

  @media (max-width: 768px) {
    margin: 0.2rem 0;
  }
`

export const Autocomplete = styled(Select)`
  width: 100%;

  > div {
    border-radius: 0.5rem !important;
  }
`

export const CustomInputMask = styled(InputMask)`
  width: 100%;
  height: 2rem;
  padding: 0 0.625rem;

  text-align: start;
  color: var(--black);
  background: var(--white);
  border: none;
  border-radius: 0.5rem;
`
