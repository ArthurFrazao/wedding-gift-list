import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
  padding: 1rem;
  background-color: white;

  height: 305px;

  border-radius: 8px;
  border: 1px solid var(--white);

  box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 12px 5px -7px rgba(0, 0, 0, 0.51);

  img {
    width: 164px;
    height: 164px;
    border-radius: 50%;
  }

  .group-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 8px;
  }
`
