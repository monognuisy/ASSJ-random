import { KeywordsPartialType, KeywordsType } from '../utils/fetch-notion';

const SET_PRIMARY = 'keywords/SET_PRIMARY' as const;
const SET_OTHERS = 'keywords/SET_OTHERS' as const;
const REMOVE_PRIMARY_WITH = 'keywords/REMOVE_PRIMARY_WITH' as const;
const REMOVE_OTHERS_WITH = 'keywords/REMOVE_OTHERS_WITH' as const;

export const setPrimary = (diff: KeywordsType['primary']) => ({
  type: SET_PRIMARY,
  payload: diff,
});
export const setOthers = (diff: KeywordsType['others']) => ({
  type: SET_OTHERS,
  payload: diff,
});
export const removePrimaryWith = (diff: KeywordsPartialType) => ({
  type: REMOVE_PRIMARY_WITH,
  payload: diff,
});
export const removeOthersWith = (diff: KeywordsPartialType) => ({
  type: REMOVE_OTHERS_WITH,
  payload: diff,
});

export type KeywordAction =
  | ReturnType<typeof setPrimary>
  | ReturnType<typeof setOthers>
  | ReturnType<typeof removePrimaryWith>
  | ReturnType<typeof removeOthersWith>;
