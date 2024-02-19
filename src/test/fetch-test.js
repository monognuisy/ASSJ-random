import { Client } from '@notionhq/client';
import { PAGE_ID, NOTION_API_KEY } from './.env.js';

const notion = new Client({ auth: NOTION_API_KEY });

const main = async () => {
  const { results } = await notion.databases.query({
    database_id: PAGE_ID,
    filter: {
      property: '이름',
      title: {
        is_not_empty: true,
      },
    },
  });

  const keywords = results
    .map(({ properties }) => [
      properties['키워드1(시작 전 발표)'].rich_text?.[0]?.plain_text,
      properties['키워드2'].rich_text?.[0]?.plain_text,
      properties['키워드3'].rich_text?.[0]?.plain_text,
      properties['키워드4(더 만들어도 자유)'].rich_text?.[0]?.plain_text,
      properties['이름'].title?.[0]?.plain_text,
    ])
    .reduce(
      (prev, curr) => {
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
      },
      {
        key_1: [],
        key_2: [],
        key_3: [],
        key_4: [],
      },
    );
  console.log(keywords);
};
main();
