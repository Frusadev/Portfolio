import { Marked } from "marked";
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export const markdownParser = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  markedKatex({
    throwOnError: false,
  })
);
