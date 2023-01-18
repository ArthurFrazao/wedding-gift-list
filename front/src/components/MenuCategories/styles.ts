import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 100px;

  a {
    text-decoration: none;
    color: var(--black);
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.5rem;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }

  .icon {
    background-color: var(--white);
    border-radius: 50%;
    padding: 1rem;
  }
`
