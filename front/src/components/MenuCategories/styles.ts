import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 100px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;

    text-decoration: none;
    color: var(--black);

    gap: 1.5rem;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }

  .icon {
    background-image: url('/assets/border-flowers-2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    padding: 1rem;
  }

  .icon svg {
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;

    margin-top: 2rem;
    gap: 1rem;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;
      font-size: 0.8rem;
    }
  }
`
