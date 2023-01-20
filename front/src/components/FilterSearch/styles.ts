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
    height: 32px;
    width: 300px;

    padding: 0 10px;

    border: none;
    border-radius: 8px;
  }

  section > span {
    margin-left: 1rem;
    :hover {
      cursor: pointer;
    }
  }
`
