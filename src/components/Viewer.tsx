import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { PartialKeyword } from 'Keywords';
import { useEffect, useState } from 'react';
import { RootState } from '../stores/root-reducer';
import { AppState } from '../stores/state';

export default function Viewer() {
  const [topic, setTopic] = useState<PartialKeyword>();
  const { primary, others } = useSelector<RootState, AppState>(
    (state) => state.keyworder,
  );

  const pickRandomFrom = (arr: PartialKeyword[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  useEffect(() => {
    if (
      primary === undefined ||
      others === undefined ||
      primary.length === 0 ||
      others.length === 0
    )
      return;

    console.log(primary, others);

    const keywordArray = primary.length === 0 ? others : primary;

    // Pick randomly.
    const randomTopic = pickRandomFrom(keywordArray);
    setTopic(() => randomTopic);
  }, [primary, others]);

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
