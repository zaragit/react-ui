import { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

import { EASING } from './common';
import BookCover from './BookCover';
import BookSpine from './BookSpine';
import { useBookshelfContext } from '.';
import { BookData, PaperData } from './types';
import { extractColorByTitleLength } from './colors';

export interface BookContextState extends BookData {
  width: number;
  isOpen: boolean;
  color: {
    primary: string;
    light: string;
    text: string;
  };
}

export const BookContext = createContext<BookContextState | null>(null);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('BookContext not found.');
  }
  return context;
};

export interface BookProps {
  id: number;
  title: string;
  category: string;
  papers: PaperData[];
}

function Book({ id, title, category, papers }: BookProps) {
  const { openId } = useBookshelfContext();
  const width = calculateWidthByPapersLength(papers);
  const color = extractColorByTitleLength(title);
  const isOpen = openId === id;

  return (
    <BookContext.Provider
      value={{
        id,
        title,
        category,
        papers,
        width,
        isOpen,
        color,
      }}
    >
      <Container
        {...{
          width,
          custom: width,
          initial: false,
          animate: isOpen ? 'open' : 'close',
          variants: {
            open: {
              width: 400,
              transition: EASING,
            },
            close: (width: number) => ({ width, transition: EASING }),
          },
        }}
      >
        <BookSpine />
        <BookCover />
      </Container>
    </BookContext.Provider>
  );
}

export default Book;

const Container = styled(motion.div)<{ width: number }>`
  display: inline-block;
  width: ${({ width }) => `${width}px`};
  height: 400px;
  overflow: hidden;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 16px;
  }
`;

const calculateWidthByPapersLength = (papers: PaperData[]) => {
  return papers.length <= 5 ? 60 : 60 + 8 * papers.length;
};
