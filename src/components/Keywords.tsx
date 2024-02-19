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
  }, []);

  return (
    <>
      <KeywordsWrapper>
        <FirstTime>
          <h1>첫번째 키워드들</h1>
          <div>
            {keywords?.key_1.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
          </div>
        </FirstTime>
        <MainTime>
          <h1>메인 키워드들</h1>
          <div>
            {keywords?.key_2.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
            {keywords?.key_3.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
            {keywords?.key_4.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
          </div>
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
const KeywordBox = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  display: inline-block;

  background-color: white;
  color: black;

  border-radius: 500px;

  min-width: 100px;
  text-align: center;
`;
