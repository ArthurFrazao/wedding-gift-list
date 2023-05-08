import styled from 'styled-components'

export const ContentLoveStory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 4rem;

  h2 {
    margin-bottom: 2rem;
    font-size: 3.125rem;
    font-family: 'Parisienne', cursive !important;
  }

  .items {
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 0.8rem;
    padding: 1rem;
  }

  .item img {
    max-width: 8rem;

    background-image: url('/assets/border-flowers-2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    padding: 2.25rem;
  }

  .item span:first-child {
    font-style: italic;
    font-size: 1.5rem;
  }

  .item .title {
    font-size: 1.25rem;
    font-weight: 600;

    text-align: center;
  }

  @media (max-width: 768px) {
    h2 {
      margin-top: 4rem;
      padding: 0 1rem;

      text-align: center;
    }

    .items {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`
