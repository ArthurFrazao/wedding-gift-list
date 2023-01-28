import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    padding: 1rem 0;
  }

  ul {
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  li {
    list-style-type: none;
  }

  span {
    padding: 1rem 0;
  }
`
