import styled from "styled-components"

export const Container = styled.header`
  background: var(--blue);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button {
      font-size: 1rem;
      color: #fff;
      background: var(--blue-light);
      border: 0;
      padding: 0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }

    .logout {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;

      &:hover {
        background-image: url("logout.svg");
        background-size: 1.5rem;
        background-repeat: no-repeat;
        background-position: 0.8rem;
        cursor: pointer;
      }

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;

        &:hover {
          opacity: 0.2;
        }
      }
    }
  }
`
