import styled from "styled-components";

export type Description = {
    relatedTopics: string[];
};
export const Description = ({ relatedTopics }: Description) => {
    const hashtagLine = fetchRelatedTopics(relatedTopics);
    return (
        <DescriptionWrapper>
            <Hashtags>{hashtagLine}</Hashtags>
        </DescriptionWrapper>
    )
}

const fetchRelatedTopics = (relatedTopics: string[]) => {
    /*
      relatedTopics: The list of hashtags - only the words are provided and is already trimmed

      returns: JSX expression for hashtags
    */
    const hashtags = relatedTopics.map(
      relatedTopic => (
        `# ${relatedTopic}　　`
      )
    );
    return hashtags
};

const DescriptionWrapper = styled.div`
    margin: 0;
`

const Hashtags = styled.h4`
    margin: 0;
`