import styled from 'styled-components';

export type Card = {
  title: string;
  author: string;
};
export const Card = ({ title, author }: Card) => {
  const red = '#561f1f';
  const green = '#216a35';
  return (
    <CardWrapper>
      <TitleCard>
        <div></div>
        <h1>{title}</h1>
      </TitleCard>
      <AuthorCard>
        <h2>{author}</h2>
      </AuthorCard>
      <ButtonWrapper>
        <Button bgcolor={red}>PASS ❌</Button>
        <Button bgcolor={green}>DONE ✅</Button>
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
  height: 40px;

  background-color: ${(props) => props.bgcolor || 'grey'};
  color: white;

  font-size: 150%;
  font-weight: bold;

  border-style: none;
`;
