# 알쓸신잡 키워드 선택기

Fetch from Notion database -> Randomly pick a keyword.

## For development

This project mainly use `pnpm` + `Vite` + `React` + `typescript`.

### pnpm installation

Make sure that you've installed pnpm in your device. For pnpm installation, please refer to their [official document](https://pnpm.io/installation).

### `env.ts` setting

You need to make `src/utils/env.ts` which contains notion page id and api key. Write down as follows:

```typescript
export const PAGE_ID = '<Our notion page id>';
export const NOTION_API_KEY =  '<Our notion api key>';
```

You can check page id (32 characters) from the url of the notion page. Here's the way to check the page id from url.
![Example](image.png)

You can make your own api key (<https://www.notion.so/my-integrations/>) or, can contact me if you're not the owner of the page.

### Run project

After installation, execute following command in this project directory to setup `node_modules`:

```bash
pnpm install
```

Execute following command for use vite dev server.

```bash
pnpm run dev
```

## To contributors

Feel free to contribute this project!

## To users

# Hashtags

To add some hashtags for a topic, please write the keyword as below:

```Tex
<topic>| #<hashtag 1> #<hashtag2> #<hashtag3>...
```

For example:

```Tex
Colors| #red #green #how_to_blend
```
