import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;

  gap: 1rem;
  padding: 1rem;
  background-color: white;

  height: 332px;

  border-radius: 8px;
  border: 1px solid var(--white);

  box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);

  h3 {
    text-align: center;
  }

  img {
    width: 164px;
    height: 164px;
    border-radius: 50%;
  }
`
