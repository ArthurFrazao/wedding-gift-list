import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  width: 60vw;
  padding-bottom: 1rem;

  button {
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-family: 'Lato', sans-serif;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(0.8);
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`

export const FormCustom = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  width: 100%;

  h3 {
    margin-top: -1rem;
    margin-bottom: 2rem;
  }

  b {
    color: var(--red);
  }

  @media (max-width: 768px) {
    margin-top: 2rem;

    h3 {
      text-align: start;
      margin-bottom: 1rem;
    }
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.6rem;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
  }

  header span {
    font-weight: bold;
  }

  margin-bottom: 1rem;
`

export const FormInput = styled.input`
  width: calc(100% - 1rem);
  height: 2rem;
  padding: 0 0.625rem;

  text-align: start;
  color: var(--black);
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
`

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`

export const ButtonConfirm = styled.button`
  border: none;
  color: #f9f9f9;
  background-color: var(--green-dark);
`

export const ButtonCancel = styled.button`
  border: 1px solid var(--red);
  background: var(--red);
  color: #f9f9f9;
`
