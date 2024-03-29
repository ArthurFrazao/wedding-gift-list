import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  span.description {
    margin-top: 1rem;
    margin-bottom: 1rem;
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

  b {
    margin-left: 0.5rem;
    color: var(--red);
  }

  button {
    margin-top: 0.5rem;
  }
`

export const SelectOption = styled.select`
  width: 100%;
  height: 2rem;
  padding: 0 10px;

  text-align: start;
  color: var(--black);
  background: var(--white);
  border: none;
  border-radius: 0.5rem;
`
