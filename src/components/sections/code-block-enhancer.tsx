"use client";

import { useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { createRoot } from "react-dom/client";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 transition-colors duration-200 border-2 shadow-[2px_2px_0px_0px_rgba(240,230,211,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
        copied 
          ? "bg-green-900/50 text-green-400 border-green-800" 
          : "bg-[#2a1010] text-[#f0e6d3] border-[#f0e6d3]/30 hover:bg-[#3a1515]"
      }`}
      aria-label="Copy code"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

export default function CodeBlockEnhancer() {
  useEffect(() => {
    const blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
      if (block.parentElement?.classList.contains("code-block-wrapper")) return;

      // Wrap the <pre> block in a relative div
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group";
      
      // Insert wrapper before block, then move block inside
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const buttonWrapper = document.createElement("div");
      // Hide button by default, show on hover of the wrapper
      buttonWrapper.className = "copy-button-wrapper absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200";
      
      wrapper.appendChild(buttonWrapper);

      const root = createRoot(buttonWrapper);
      const codeNode = block.querySelector("code");
      const text = codeNode ? codeNode.innerText : block.innerText;
      
      root.render(<CopyButton text={text} />);
    });
  }, []);

  return null;
}
