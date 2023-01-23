import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: 3rem;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  input {
    height: 2rem;
    width: 300px;

    padding: 0 10px;

    border: none;
    border-radius: 0.5rem;
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 0.5rem;
  }

  section > span {
    margin-left: 1rem;
    :hover {
      cursor: pointer;
    }
  }
`

export const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  .group__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .field__search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
    margin-bottom: 1rem;
  }

  input {
    height: 2rem;
    width: 80vw;

    padding: 0 10px;

    border: none;
    border-radius: 0.5rem;
  }
`
