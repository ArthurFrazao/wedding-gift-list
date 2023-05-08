import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;

    gap: 0.5rem;
    margin-left: 1rem;
  }

  .item-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    backdrop-filter: blur(7px) saturate(150%);
    -webkit-backdrop-filter: blur(7px) saturate(150%);
    background-color: rgba(17, 25, 40, 0.32);

    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    padding: 0.8rem;

    color: var(--white);
    width: 100px;
    height: 100px;

    z-index: -99;
  }

  .number {
    font-size: 1.25rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    > div {
      margin-left: 0;
    }

    .item-date {
      width: 85px;
      height: 85px;
    }
  }
`
