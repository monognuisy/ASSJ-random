import { KeywordsType } from '../utils/fetch-notion';

export type AppState = {
  primary: KeywordsType['primary'];
  others: KeywordsType['others'];
};
