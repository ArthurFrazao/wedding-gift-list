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

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
  }

  span {
    width: 80%;
  }
`
