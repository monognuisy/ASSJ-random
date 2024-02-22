import type { AppState } from '../state';
import type { KeywordAction } from '../actions';

const initialAppState: AppState = {
  primary: [],
  others: [],
};

const keyworder = (
  state: AppState = initialAppState,
  action: KeywordAction,
) => {
  switch (action.type) {
    case 'keywords/SET_PRIMARY':
      return {
        ...state,
        primary: action.payload,
      };
    case 'keywords/SET_OTHERS':
      return {
        ...state,
        others: action.payload,
      };
    case 'keywords/REMOVE_PRIMARY_WITH':
      return {
        ...state,
        primary: state.primary.filter(
          (item) =>
            item.keyword !== action.payload.keyword ||
            item.name !== action.payload.name,
        ),
      };
    case 'keywords/REMOVE_OTHERS_WITH':
      return {
        ...state,
        others: state.others.filter(
          (item) =>
            item.keyword !== action.payload.keyword ||
            item.name !== action.payload.name,
        ),
      };
    default:
      return state;
  }
};

export default keyworder;
