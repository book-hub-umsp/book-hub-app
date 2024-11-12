'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { Flex } from "@mantine/core";

import { Toolbar } from './Toolbar';
import { ContentEditable } from './ContentEditable';
import { ImageNode, CommentNode } from './nodes';
import { ListMaxIndentLevelPlugin, CodeHighlightPlugin, ReadOnlyPlugin, LinkPlugin as InnerLinkPlugin, OnChangeMarkdown, ImagePlugin, CommentPlugin } from './plugins'
import { editorTheme } from './Editor.constants'
import styles from './Editor.module.scss'
import './styles.scss'

import type { FC } from 'react'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'

const editorConfig: InitialConfigType = {
  namespace: 'editor',
  theme: editorTheme,
  onError: (err) => {
    throw err
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
    CommentNode
  ]
};

export type EditorProps = {
  onChange?: (value: string) => void
  isDisabled?: boolean
}

const Editor: FC<EditorProps> = (props) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Flex direction={'column'} flex={1}>
        <Toolbar />
        <div className={styles.root}>
          <ContentEditable />
          <HistoryPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangeMarkdown onChange={props.onChange} />
          <ReadOnlyPlugin isDisabled={props.isDisabled} />
          <InnerLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <ImagePlugin />
          <CommentPlugin />
        </div>
      </Flex>
    </LexicalComposer>
  );
}

export default Editor;
