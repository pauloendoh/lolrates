import styled from "styled-components";

const S = {
  Container: styled.div`
    display: flex;
    gap: 16px;
    a {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  `,
};

export default S;
