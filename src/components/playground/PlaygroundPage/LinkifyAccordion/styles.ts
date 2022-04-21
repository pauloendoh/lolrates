import styled from "styled-components";

namespace S {
  export const Container = styled.div`
    display: flex;
    gap: 16px;
    a {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  `;
}

export default S;
