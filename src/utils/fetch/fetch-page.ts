import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import * as Env from '../env';
import { Topic, retrieveTopic } from './fetch-topic';


export type PageView = {
    'id': string,
    'page': PageObjectResponse[]
}


/*
    페이지를 가져옴.

    :pageId: 가져올 페이지의 pageId
*/
export const retrievePage = async (pageId: string): Promise<PageObjectResponse[]> => {
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
    홈페이지 아래의 모임 페이지를 가져옴. 아이디도 기록함.

    :ids: 획득한 pageId
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.

    :returns: PageView의 배열
    형태)
    [
        {"id": string, "page": PageObjectResponse[]}, ...
    ]
*/
const findMeetingPageFromId = async (ids: string[]): Promise<PageView[]> => {
  const pages = await Promise.all(
    ids.map(
      async childPageId => ({'id': childPageId, 'page': await retrievePage(childPageId)} as PageView)
    )
  );
  return pages;
};


/*
    홈페이지를 불러오고, 그 홈페이지에 속한 페이지를
    {id: Page} 형태로 가져옴.

    :pageId: 가져올 페이지(홈페이지)의 page_id
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
    :returns: PageFile의 배열
    형태)
    [
        {"id": string, "page": PageObjectResponse[]}, ...
    ]
*/
export const retrieveMeetingPage = async (pageId: string, title?: string): Promise<PageView[]> => {
  const root = await retrievePage(pageId);
  const meetingPageId = findMeetingPageId(root, title);
  const meetingPage = await findMeetingPageFromId(meetingPageId);
  return meetingPage;
};


/*
    홈페이지를 불러오고, 그 홈페이지에 속한 페이지를
    {id: Page} 형태로 가져옴. 딱 1개만

    :pageId: 가져올 페이지(홈페이지)의 page_id
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
    :returns: PageView
    형태)
    {"id": string, "page": PageObjectResponse[]}, ...
*/
export const retrieveMeetingPageSingular = async (pageId: string, title?: string): Promise<PageView> => {
  const root = await retrievePage(pageId);
  const meetingPageId = findMeetingPageId(root, title);
  const meetingPage = await findMeetingPageFromId(meetingPageId);
  return meetingPage[0];
};


/*
    홈페이지 아래의 데이터베이스 아이디를 가져옴. (이 함수는 페이지를 가져오는 함수와 달리 1개만 가져옴)

    :root: 가져온 홈페이지
    :title: 찾으려는 데이터베이스. 필수!
*/
const findDatabaseId = (root: PageObjectResponse[], title: string): string => {
  // 필터
  const validityCheck = (item: PageObjectResponse, checkTitle: string) => (
    'child_database' in item && typeof item.child_database == 'object' && item.child_database // 확실한 자식 데이터베이스인지 검사
        && 'title' in item.child_database && typeof item.child_database.title == 'string' // 자식 데이터베이스의 제목이 있는지 검사
        && item.child_database.title.includes(checkTitle) // 그게 찾는 모임인지 검사
  );

  const childPageId = root.find(block => validityCheck(block, title))!.id;
  return childPageId;
};


/*
    홈페이지를 불러오고, 그 홈페이지에 속한 주제/논제 데이터베이스를 가져옴. (이 함수는 페이지를 가져오는 함수와 달리 1개만 가져옴.)

    :page_id: 가져올 페이지(홈페이지)의 page_id
    :title: 찾으려는 데이터베이스. 필수!
*/
export const retrieveTopicDirectly = async (pageId: string, title: string): Promise<Topic> => {
  const root = await retrievePage(pageId);
  const databaseId = findDatabaseId(root, title);
  const topic = await retrieveTopic(databaseId);
  return topic;
};