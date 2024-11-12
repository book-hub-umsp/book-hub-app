import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { Box } from '@mantine/core';

import styles from './ContentEditable.module.scss';

import type { FC } from 'react';

const ContentEditable: FC = () => <Box px={'sm'} py={'md'} className={styles.root}>
  <RichTextPlugin
    contentEditable={<LexicalContentEditable className={styles.editor} />}
    placeholder={<div className={styles.placeholder}>Enter some rich text...</div>}
    ErrorBoundary={LexicalErrorBoundary}
  />
</Box>

export default ContentEditable;
