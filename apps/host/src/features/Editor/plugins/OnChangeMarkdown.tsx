import { useMemo } from "react";
import { $convertToMarkdownString } from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { debounce } from 'lodash';

import type { FC} from "react";
import type { EditorState } from "lexical";

const transformState = (
  editorState: EditorState,
  transformers: any,
  onChange?: (value: string) => void,
) => {
  editorState.read(() => {
    const markdown = $convertToMarkdownString(transformers);
    const withBrs = markdown
      .replace(/\n(?=\n)/g, "\n\n<br>\n")
      .replace(/^(&gt\;)(?=\s)(?!.*&lt\;)/gm, ">");

    onChange?.(withBrs);
  });
}

export type OnChangeMarkdownProps =  {
  transformers?: any;
  onChange?: (value: string) => void;
  __UNSAFE_debounceTime?: number;
}

const OnChangeMarkdown: FC<OnChangeMarkdownProps> = ({ onChange, transformers, __UNSAFE_debounceTime }) => {
  const OnChangeMarkdown = useMemo(() => {
    return debounce(
      (state: EditorState) => transformState(state, transformers, onChange),
      __UNSAFE_debounceTime ?? 200
    );

  }, [onChange, __UNSAFE_debounceTime]);

  return (
    <OnChangePlugin
      onChange={OnChangeMarkdown}
      ignoreSelectionChange
    />
  );
}

export default OnChangeMarkdown;
