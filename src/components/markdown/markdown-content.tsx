"use client";

import * as React from "react";
import { Marked } from "marked";
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { cn } from "@/lib/utils";

const markedParser = new Marked(
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

export function MarkdownContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const html = React.useMemo(() => {
    try {
      return markedParser.parse(content || "") as string;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div
      className={cn(
        "prose prose-invert max-w-none text-text-secondary leading-relaxed text-sm",
        "prose-p:leading-relaxed prose-p:my-2",
        "prose-code:text-accent-secondary prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-code:bg-surface_elevated/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
        "prose-pre:bg-surface_elevated/90 prose-pre:rounded-2xl prose-pre:p-4 prose-pre:my-3 prose-pre:overflow-x-auto",
        "prose-headings:text-text-primary prose-headings:font-medium prose-headings:my-3",
        "prose-a:text-accent-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-accent-hover",
        "prose-blockquote:border-l-2 prose-blockquote:border-white/10 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-muted",
        "prose-ul:list-disc prose-ul:pl-5 prose-ul:my-2",
        "prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-2",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MarkdownContent;
