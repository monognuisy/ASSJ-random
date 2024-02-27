import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import * as Env from '../env';

/*
    페이지를 가져옴.

    :page_id: 가져올 페이지의 page_id
*/
const retrievePage = async (page_id: string): Promise<PageObjectResponse[]> => {
    const response = await fetch(`api/v1/blocks/${page_id}/children`, {
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
    const validity_check = (item: PageObjectResponse, check_title: string) => (
        "child_page" in item && typeof item.child_page == "object" && item.child_page // 확실한 자식 페이지인지 검사
        && "title" in item.child_page && typeof item.child_page.title == "string" // 자식 페이지의 제목이 있는지 검사
        && item.child_page.title.includes(check_title) // 그게 찾는 모임인지 검사
    )

    if (title == null) {
        const child_page_ids = root
            .filter( block => validity_check(block, "모임") )
            .map( page_object => page_object.id );
        return child_page_ids;
    }

    const child_page_id = root.find( block => validity_check(block, title) )!.id;
    return [child_page_id];
}


/*
    홈페이지 아래의 모임 페이지를 가져옴.

    :root: 가져온 홈페이지
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
*/
const findMeetingPage = async (root: PageObjectResponse[], title?: string): Promise<PageObjectResponse[][]> => {
    const ids = findMeetingPageId(root, title);
    const pages = await Promise.all(
        ids.map(
            async child_page_id => await retrievePage(child_page_id)
        )
    );
    return pages;
}


/*
    홈페이지를 불러오고, 그 홈페이지에 속한 페이지를 가져옴.

    :page_id: 가져올 페이지(홈페이지)의 page_id
    :title: 찾으려는 모임. 주어지지 않을 경우, 모든 모임을 가져옴.
*/
export const retrieveMeetingPage = async (page_id: string, title?: string) => {
    const root = await retrievePage(page_id);
    const meeting_page = await findMeetingPage(root, title);
    return meeting_page;
}