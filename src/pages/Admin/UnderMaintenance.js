import React from 'react';
import styled from 'styled-components';

const underMaintenance = () => {
  return (
    <Wrapper>
      <h3>Chức năng này đang được bảo trì, vui lòng thử lại sau</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 5rem);
  color: var(--primary-yellow);
`;

export default underMaintenance;
