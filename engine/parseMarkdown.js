import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

export async function parseMarkdown(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      footnoteLabel: "შენიშვნები",
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
