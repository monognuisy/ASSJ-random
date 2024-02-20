import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { PartialKeyword } from 'Keywords';
import { useEffect, useState } from 'react';
import { RootState } from '../stores/root-reducer';

export default function Viewer() {
  const [topic, setTopic] = useState<PartialKeyword>();
  const primary = useSelector<RootState, PartialKeyword[]>(
    (state) => state.keyworder.primary,
  );

  useEffect(() => {
    setTopic(() => primary?.[0]);
  }, [primary]);

  return (
    <>
      <ViewerWrapper className="viewer">
        <Card title={topic?.keyword ?? ''} author={topic?.name ?? ''} />
      </ViewerWrapper>
    </>
  );
}

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  margin: 0 auto;
`;
