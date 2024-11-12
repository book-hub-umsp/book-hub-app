import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import type { FC } from "react";

export type ReadOnlyPluginProps = {
  isDisabled?: boolean;
}

const ReadOnlyPlugin: FC<ReadOnlyPluginProps> = ({ isDisabled = false }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!isDisabled);
  }, [editor, isDisabled]);

  return null;
}

export default ReadOnlyPlugin;
