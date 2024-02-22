import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { PartialKeyword } from 'Keywords';
import { useEffect, useState } from 'react';
import { RootState } from '../stores/root-reducer';
import { AppState } from '../stores/state';

export default function Viewer() {
  const [topic, setTopic] = useState<PartialKeyword>();
  const [keywordArray, setKeywordArray] = useState<PartialKeyword[]>([]);
  const { primary, others } = useSelector<RootState, AppState>(
    (state) => state.keyworder,
  );

  const pickRandomFrom = (arr: PartialKeyword[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const passTopic = (topic: PartialKeyword) => {
    if (keywordArray.length <= 1) return;

    const arr = keywordArray.filter(
      (item) => item.keyword !== topic.keyword || item.name !== topic.name,
    );
    const randomTopic = pickRandomFrom(arr);
    setTopic(() => randomTopic);
  };

  useEffect(() => {
    if (primary === undefined || others === undefined) return;

    const kwrdArray = primary.length === 0 ? others : primary;
    setKeywordArray(kwrdArray);

    // Pick randomly.
    const randomTopic = pickRandomFrom(kwrdArray);
    setTopic(() => randomTopic);
  }, [primary, others]);

  return (
    <>
      <ViewerWrapper className="viewer">
        <Card
          title={topic?.keyword ?? ''}
          author={topic?.name ?? ''}
          related_topics={topic?.hashtags ?? []}
          onPass={passTopic}
        />
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
