import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PAGE_ID, NOTION_API_KEY } from './env';
import { WholeKeywords } from 'Keywords';

type BlockProperties = Record<
  | '키워드1(시작 전 발표)'
  | '키워드2'
  | '키워드3'
  | '키워드4(더 만들어도 자유)'
  | '이름',
  {
    rich_text?: {
      plain_text?: string;
    }[];
    title: {
      plain_text?: string;
    }[];
  }
>;

export const fetchKeywords = async () => {
  const queryFilter = {
    filter: {
      property: '이름',
      title: {
        // eslint-disable-next-line camelcase
        is_not_empty: true,
      },
    },
  };

  const response = await fetch(`api/v1/databases/${PAGE_ID}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${NOTION_API_KEY}`,
    },
    body: JSON.stringify(queryFilter),
  }).then((res) => res.json());

  const results = response.results as PageObjectResponse[];

  const keywords = results
    .map((item) => {
      const properties = item.properties as unknown as BlockProperties;
      return [
        properties['이름'].title[0].plain_text as string,
        properties['키워드1(시작 전 발표)'].rich_text?.[0]?.plain_text,
        properties['키워드2'].rich_text?.[0]?.plain_text,
        properties['키워드3'].rich_text?.[0]?.plain_text,
        properties['키워드4(더 만들어도 자유)'].rich_text?.[0]?.plain_text,
      ];
    })
    .reduce(
      (prev: WholeKeywords, curr: (string | undefined)[]) => {
        const { primary, others } = prev;

        const [name, rawPrimaryKeyword, ...rest] = curr;
        const otherKeywords = rest
          .filter((item) => item !== undefined)
          .map((item) => {
            const keyAndHash = getHashtagsFromKeyword(item as string);
            return {
              keyword: keyAndHash.keyword,
              hashtags: keyAndHash.hashtags,
              name: name as string,
            };
          });
        const primaryKeyAndHash = getHashtagsFromKeyword(rawPrimaryKeyword as string);
        const primaryKeyword = primaryKeyAndHash.keyword;
        const primaryHashtag = primaryKeyAndHash.hashtags;
        return {
          primary:
            primaryKeyword === undefined
              ? primary
              : [...primary, { keyword: primaryKeyword, hashtags: primaryHashtag, name: name as string }],
          others: [...others, ...otherKeywords],
        };
      },
      {
        primary: [],
        others: [],
      },
    );

  return keywords;
};

const getHashtagsFromKeyword = (rawKeyword: (string | undefined)) => {
  /*
    Preprocessing to find hashtags
    Finds hashtags from a given raw text.
    Assume the following syntax:
    <Keyword>| #<hashtag1> #<hashtag2> ...

    rawKeyword: raw text given; if this is undefined the funciton assumes that there is no keyword.

    return: keyword and hastags pair. hashtags are undefined or an array of strings.
  */
  if (rawKeyword == undefined) return {keyword: undefined, hashtags: undefined};
  if (!rawKeyword.includes('|')) return {keyword: rawKeyword, hashtags: undefined};
  const [keyword, rawHashtags] = rawKeyword.split('|');
  const hashtags = rawHashtags.split('#').map((item) => (item.trim())).filter((item) => (item.length > 0));
  return {keyword: keyword, hashtags: hashtags};
};