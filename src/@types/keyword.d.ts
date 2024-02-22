declare module 'Keywords' {
  export type PartialKeyword = {
    keyword: string;
    name: string;
    hashtags: string[];
  };
  export type WholeKeywords = {
    primary: PartialKeywords[];
    others: PartialKeywords[];
  };
}
