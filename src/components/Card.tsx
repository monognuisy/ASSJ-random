import { PartialKeyword } from 'Keywords';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeOthersWith, removePrimaryWith } from '../stores/actions';
import { RootState } from '../stores/root-reducer';
import { AppState } from '../stores/state';

export type Card = {
  title: string;
  author: string;
  related_topics: string[];
  onPass: (topic: PartialKeyword) => void;
};
export const Card = ({ title, author, related_topics, onPass }: Card) => {
  const { primary } = useSelector<RootState, AppState>(
    (state) => state.keyworder,
  );
  const dispatch = useDispatch();

  const red = '#561f1f';
  const green = '#216a35';

  const topic: PartialKeyword = {
    keyword: title,
    name: author,
    hashtags: related_topics
  };

  const fetchRelatedTopics = (related_topics: string[]) => {
      /*
        related_topics: The list of hashtags - only the words are provided and is already trimmed

        returns: JSX expression for hashtags
      */
      const hashtags = related_topics.map(
        related_topic => (
          `# ${related_topic}　　`
        )
      );
      return (
        <div id="hash">
          <h4>{hashtags}</h4>
        </div>
      )
  };
  const hashtags = fetchRelatedTopics(related_topics);

  const onClickPass = () => {
    if (topic.keyword === '' || topic.name === '') return;

    onPass(topic);
  };
  const onClickDone = () => {
    if (topic.keyword === '' || topic.name === '') return;

    return primary.length === 0
      ? dispatch(removeOthersWith(topic))
      : dispatch(removePrimaryWith(topic));
  };

  return (
    <CardWrapper>
      <TitleCard>
        <div></div>
        <h1>{title}</h1>
      </TitleCard>
      <AuthorCard>
        <h2>{author}</h2>
        {hashtags}
      </AuthorCard>
      <ButtonWrapper>
        <Button bgcolor={red} onClick={onClickPass}>
          PASS ❌
        </Button>
        <Button bgcolor={green} onClick={onClickDone}>
          DONE ✅
        </Button>
      </ButtonWrapper>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  height: 70%;
  aspect-ratio: 3 / 4;

  margin: 0 auto;
  padding: 1rem;

  background-color: #434343;

  border-radius: 10px;
`;
const TitleCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 2rem);
  aspect-ratio: 1 / 1;

  background-color: #202020;
  border-radius: 10px;

  margin: 0;
  padding: 1rem;

  & > h1 {
    font-size: 500%;
    margin: 0;
  }
`;
const AuthorCard = styled.div`
  margin: 0;
  padding: 1rem;

  & > h2 {
    margin: 0;
    font-size: 200%;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5%;

  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button<{ bgcolor: string }>`
  display: block;
  border-radius: 10px;
  width: 100%;
  min-height: 40px;

  background-color: ${(props) => props.bgcolor || 'grey'};
  color: white;

  font-size: 150%;
  font-weight: bold;

  border-style: none;
  padding: 0.5rem;
`;
