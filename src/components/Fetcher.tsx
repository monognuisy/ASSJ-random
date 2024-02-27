import * as Page from "../utils/fetch/fetch-page";
import * as Database from "../utils/fetch/fetch-database";
import * as Env from "../utils/env";

export default function Fetcher() {
  console.log(Page.retrieveMeetingPage(Env.HOMEPAGE_ID, "2회차 모임"));
  console.log(Database.testing(Env.TEST_DATABASE_ID));
  return <></>;
}
