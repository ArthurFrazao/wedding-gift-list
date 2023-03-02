import styled from 'styled-components'

export const ContentLoveStory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 4rem;

  h2 {
    margin-bottom: 2rem;
  }

  .itens {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 0.5rem;
    padding: 1rem;
  }

  .item span:first-child {
    font-style: italic;
  }

  .item .title {
    font-size: 1.25rem;
    font-weight: 600;

    text-align: center;
  }

  @media (max-width: 768px) {
    h2 {
      margin-top: 4rem;
    }

    .itens {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`
