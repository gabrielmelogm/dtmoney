import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;

    &.login {
      display: flex;
      flex-direction: column;
      height: 100vh;

      div {
        display: flex;
        gap: 0.5rem;

        img {
          width: 24px;
          height: 24px;
        }

        span {
          font-size: 1rem;
          color: var(--text-title);
          font-weight: 600;
        }
      }

      h2 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-title);
      }

      h3 {
        font-size: 1rem;
        font-weight: 400;
        color: var(--text-title);
      }
    }
    &.welcome {
      background: var(--blue);
    }
  }
`
