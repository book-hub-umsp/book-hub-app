import { useEffect } from "react";
import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import type { FC } from "react";

const CodeHighlightPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}

export default CodeHighlightPlugin;
