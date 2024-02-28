import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import * as Env from '../env';


/*
    페이지를 가져옴.

    :page_id: 가져올 페이지의 page_id
*/
const retrievePage = async (pageId: string): Promise<PageObjectResponse[]> => {
  const response = await fetch(`api/v1/blocks/${pageId}/children`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${Env.NOTION_API_KEY}`
    }
  }).then((res) => res.json());

  const results = response.results as PageObjectResponse[];
  return results;
};


/*
    홈페이지 아래의 모임 페이지의 아이디를 가져옴.

    :root: 가져온 홈페이지
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
*/
const findMeetingPageId = (root: PageObjectResponse[], title?: string): string[] => {
  // 필터
  const validityCheck = (item: PageObjectResponse, checkTitle: string) => (
    'child_page' in item && typeof item.child_page == 'object' && item.child_page // 확실한 자식 페이지인지 검사
        && 'title' in item.child_page && typeof item.child_page.title == 'string' // 자식 페이지의 제목이 있는지 검사
        && item.child_page.title.includes(checkTitle) // 그게 찾는 모임인지 검사
  );

  if (title == null) {
    const childPageIds = root
      .filter(block => validityCheck(block, '모임'))
      .map(pageObject => pageObject.id);
    return childPageIds;
  }

  const childPageId = root.find(block => validityCheck(block, title))!.id;
  return [childPageId];
};


/*
    홈페이지 아래의 모임 페이지를 가져옴.

    :root: 가져온 홈페이지
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
*/
const findMeetingPage = async (root: PageObjectResponse[], title?: string): Promise<PageObjectResponse[][]> => {
  const ids = findMeetingPageId(root, title);
  const pages = await Promise.all(
    ids.map(
      async childPageId => await retrievePage(childPageId)
    )
  );
  return pages;
};


/*
    홈페이지를 불러오고, 그 홈페이지에 속한 페이지를 가져옴.

    :page_id: 가져올 페이지(홈페이지)의 page_id
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
*/
export const retrieveMeetingPage = async (pageId: string, title?: string) => {
  const root = await retrievePage(pageId);
  const meetingPage = await findMeetingPage(root, title);
  return meetingPage;
};