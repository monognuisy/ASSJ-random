import styled from 'styled-components';
import { Card } from './Card';

export default function Viewer() {
  return (
    <>
      <ViewerWrapper className="viewer">
        <Card title={`음악`} author={`monognuisy`} />
      </ViewerWrapper>
    </>
  );
}

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
