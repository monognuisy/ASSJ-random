import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PAGE_ID, NOTION_API_KEY } from './env';

const notion = new Client({ auth: NOTION_API_KEY });

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
    title?: {
      plain_text?: string;
    }[];
  }
>;

export type KeywordsType = Record<
  'key_1' | 'key_2' | 'key_3' | 'key_4',
  {
    keyword: string;
    name: string | undefined;
  }[]
>;

export const fetchKeywords = async () => {
  const response = await notion.databases.query({
    database_id: PAGE_ID,
    filter: {
      property: '이름',
      title: {
        is_not_empty: true,
      },
    },
  });
  const results = response.results as PageObjectResponse[];

  const tempInit: KeywordsType = {
    key_1: [],
    key_2: [],
    key_3: [],
    key_4: [],
  };

  const keywords = results
    .map((item) => {
      const properties = item.properties as unknown as BlockProperties;
      return [
        properties['키워드1(시작 전 발표)'].rich_text?.[0]?.plain_text,
        properties['키워드2'].rich_text?.[0]?.plain_text,
        properties['키워드3'].rich_text?.[0]?.plain_text,
        properties['키워드4(더 만들어도 자유)'].rich_text?.[0]?.plain_text,
        properties['이름'].title?.[0].plain_text,
      ];
    })
    .reduce((prev: KeywordsType, curr: (string | undefined)[]) => {
      const [first, second, third, fourth, name] = curr;
      const { key_1, key_2, key_3, key_4 } = prev;
      return {
        key_1:
          first === undefined ? key_1 : [...key_1, { keyword: first, name }],
        key_2:
          second === undefined ? key_2 : [...key_2, { keyword: second, name }],
        key_3:
          third === undefined ? key_3 : [...key_3, { keyword: third, name }],
        key_4:
          fourth === undefined ? key_4 : [...key_4, { keyword: fourth, name }],
      };
    }, tempInit);

  return keywords;
};
