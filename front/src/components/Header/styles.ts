import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 1rem 4rem;
  background: var(--white);

  box-shadow: 1px -1px 98px 5px rgba(81, 81, 81, 0.19);
  -webkit-box-shadow: 1px -1px 98px 5px rgba(81, 81, 81, 0.19);
  -moz-box-shadow: 1px -1px 98px 5px rgba(81, 81, 81, 0.19);

  position: fixed;

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
`
