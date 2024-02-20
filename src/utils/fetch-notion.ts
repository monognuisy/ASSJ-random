import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PAGE_ID, NOTION_API_KEY } from './env';

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

export type KeywordsPartialType = {
  keyword: string;
  name: string;
};
export type KeywordsType = {
  primary: KeywordsPartialType[];
  others: KeywordsPartialType[];
};

export const fetchKeywords = async () => {
  const queryFilter = {
    filter: {
      property: '이름',
      title: {
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
      (prev: KeywordsType, curr: (string | undefined)[]) => {
        const { primary, others } = prev;

        const [name, primaryKeyword, ...rest] = curr;
        const otherKeywords = rest
          .filter((item) => item !== undefined)
          .map((item) => ({
            keyword: item as string,
            name: name as string,
          }));

        return {
          primary:
            primaryKeyword === undefined
              ? primary
              : [...primary, { keyword: primaryKeyword, name: name as string }],
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
