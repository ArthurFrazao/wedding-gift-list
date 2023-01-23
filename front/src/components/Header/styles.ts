import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: fixed;

  width: 100%;
  padding: 1rem 4rem;
  background: var(--white);

  box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);

  a {
    text-decoration: none;
  }

  .title__gift {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 1rem;
  }

  .title__gift > span {
    padding-right: 2rem;
    border-right: 1px solid #808080;
  }

  h4 {
    margin-top: 4px;
    padding-left: 2rem;

    font-size: 2rem;
    font-family: 'Parisienne', cursive !important;
    color: var(--black);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 1rem;
    padding: 1rem 1.5rem;

    .title__gift > span {
      border: none;
    }

    h4 {
      padding-left: 0;
      font-size: 1.5rem;
    }
  }
`

export const ReturnPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  height: 2rem;
  padding-right: 2rem;
  border-right: 1px solid #808080;

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`
