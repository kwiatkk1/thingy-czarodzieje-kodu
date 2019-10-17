import React, { useState, useEffect } from "react";

export default function useMarkdown(src) {
  const [ markdownText, setMarkdownText ] = useState("");

  useEffect(() => {
    fetch(src)
      .then(r => r.text())
      .then(md => setMarkdownText(md));
  }, [src]);

  return markdownText;
}
