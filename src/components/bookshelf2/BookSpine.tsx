import { css } from '@emotion/react';
import { useCallback, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

import { BookshelfContext } from '.';
import { BookData } from '../bookshelf/types';
import { extractColorByTitleLength } from './colors';

export interface BookSpineProps {
  book: BookData;
}

const EASING = { duration: 1, ease: [0.45, 0, 0.55, 1] };

const variants = {
  open: {
    rotateY: 90,
    transition: EASING,
  },
  close: {
    rotateY: 0,
    transition: EASING,
  },
};

const calculateBookWidth = (papersLength: number) => {
  return papersLength <= 5 ? 60 : 60 + 8 * papersLength;
};

function BookSpine({ book }: BookSpineProps) {
  const { openId, setOpenId } = useContext(BookshelfContext);
  const color = extractColorByTitleLength(book.title);
  const width = calculateBookWidth(book.papers.length);
  const isOpened = openId === book.id;

  const open = useCallback(() => {
    setOpenId(book.id);
  }, [book.id, setOpenId]);

  return (
    <Container
      {...{
        initial: false,
        width,
        animate: isOpened ? 'open' : 'close',
        variants,
        onClick: open,
        ...color,
      }}
    >
      <div>
        <span className="book-title">{book.title}</span>
        <span className="book-category">{book.category}</span>
      </div>
    </Container>
  );
}

export default BookSpine;

const Container = styled(motion.div)<{
  width: number;
  primary: string;
  light: string;
  text: string;
}>`
  display: inline-block;
  width: ${({ width }) => `${width}px`};
  height: 100%;
  transform-origin: left center;

  > div {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0px;
    writing-mode: vertical-lr;
    font-weight: 900;
    background-color: ${({ light }) => `${light}`};
    color: ${({ text }) => `${text}`};
  }
`;
