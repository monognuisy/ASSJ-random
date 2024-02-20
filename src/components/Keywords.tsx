import { useEffect } from 'react';
import styled from 'styled-components';

import { fetchKeywords } from '../utils/fetch-notion';
import { useDispatch, useSelector } from 'react-redux';
import { setOthers, setPrimary } from '../stores/actions';
import { PartialKeyword } from 'Keywords';
import { RootState } from '../stores/root-reducer';
import { AppState } from '../stores/state';

export default function Keywords() {
  const dispatch = useDispatch();
  const { primary, others } = useSelector<RootState, AppState>(
    (state) => state.keyworder,
  );
  const onSetPrimary = (diff: PartialKeyword[]) => dispatch(setPrimary(diff));
  const onSetOthers = (diff: PartialKeyword[]) => dispatch(setOthers(diff));

  const doFetchAndSet = async () => {
    const kwrds = await fetchKeywords();
    onSetPrimary(kwrds.primary);
    onSetOthers(kwrds.others);
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
            {primary.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
          </div>
        </FirstTime>
        <MainTime>
          <h1>메인 키워드들</h1>
          <div>
            {others.map(({ keyword }, i) => {
              return <KeywordBox key={i}>{keyword}</KeywordBox>;
            })}
          </div>
        </MainTime>
        <FetchButtonWrapper>
          <ResetButton onClick={doFetchAndSet}>RESET ⚠️</ResetButton>
        </FetchButtonWrapper>
      </KeywordsWrapper>
    </>
  );
}

const KeywordsWrapper = styled.section`
  width: calc(100% - 2rem);
  display: grid;

  grid-template-rows: 1fr 2fr auto;
  padding: 1rem;

  background-color: #111111;

  & h1 {
    font-size: 2rem;
  }
`;
const FirstTime = styled.div``;
const MainTime = styled.div``;
const FetchButtonWrapper = styled.div``;
const ResetButton = styled.button`
  display: block;
  margin: 0 auto;

  width: 60%;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ffec1c;
  color: black;

  border-radius: 10px;
  border-style: none;
  padding: 0.5rem;
`;
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
