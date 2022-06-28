import { darken } from "polished"
import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;

  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .login {
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 0 10rem;
      margin-top: 3rem;

      .title {
        display: flex;
        gap: 0.5rem;

        img {
          width: 24px;
          height: 24px;
        }

        span {
          font-size: 1rem;
          color: var(--text-title);
          font-weight: 700;
        }
      }

      h2 {
        display: inline-block;
        margin-top: 3rem;
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-title);
      }

      h3 {
        font-size: 1rem;
        font-weight: 300;
        color: var(--text-title);
      }

      .content-button {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: transparent;
          border: 2px solid #d6d6d6;
          border-radius: 0.25rem;
          height: 4rem;

          transition: border-color 0.2s;

          &:hover {
            border-color: ${darken(0.1, "#d7d7d7")};
          }

          span {
            font-weight: 600;
            color: var(--text-title);
          }
        }
      }
    }
    .welcome {
      background: var(--blue);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;

      img {
        position: absolute;
        max-width: 750px;
        width: 100%;
        top: 6rem;
        right: -1rem;
      }

      p {
        display: inline-block;
        margin-top: 13rem;
        font-size: 3rem;
        font-weight: 700;
        color: var(--shape);
        text-align: center;
      }

      .footer-information {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 0.75rem;
        color: var(--shape);
        position: absolute;
        bottom: 1rem;
      }
    }
  }
`
