import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchKeywords, KeywordsType } from '../utils/fetch-notion';

export default function Keywords() {
  const [keywords, setKeywords] = useState<KeywordsType>();

  const doFetchAndSet = async () => {
    const kwrds = await fetchKeywords();
    setKeywords(() => kwrds);
  };

  useEffect(() => {
    doFetchAndSet();
    console.log(keywords);
  }, []);

  return (
    <>
      <KeywordsWrapper>
        <FirstTime>
          <h1>첫번째 키워드들</h1>
        </FirstTime>
        <MainTime>
          <h1>메인 키워드들</h1>
        </MainTime>
        <FetchButtonWrapper></FetchButtonWrapper>
      </KeywordsWrapper>
    </>
  );
}

const KeywordsWrapper = styled.section`
  width: calc(100% - 2rem);
  display: grid;

  grid-template-rows: repeat(3, auto);
  padding: 1rem;

  background-color: #111111;

  & h1 {
    font-size: 2rem;
  }
`;
const FirstTime = styled.div``;
const MainTime = styled.div``;
const FetchButtonWrapper = styled.div``;
