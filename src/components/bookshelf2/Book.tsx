import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useContext } from 'react';

import BookCover from './BookCover';
import BookSpine from './BookSpine';
import { BookshelfContext } from '.';
import { BookData } from '../bookshelf/types';

export interface BookProps {
  book: BookData;
}

const EASING = { duration: 1, ease: [0.45, 0, 0.55, 1] };

const variants = {
  open: {
    width: 400,
    transition: EASING,
  },
  close: (width: number) => ({ width, transition: EASING }),
};

const calculateBookWidth = (papersLength: number) => {
  return papersLength <= 5 ? 60 : 60 + 8 * papersLength;
};

function Book({ book }: BookProps) {
  const { openId, setOpenId } = useContext(BookshelfContext);
  const width = calculateBookWidth(book.papers.length);
  const isOpened = openId === book.id;

  return (
    <Container
      {...{
        initial: false,
        animate: isOpened ? 'open' : 'close',
        custom: width,
        variants,
        width,
      }}
    >
      <BookSpine book={book} />
      <BookCover book={book} />
    </Container>
  );
}

export default Book;

const Container = styled(motion.div)<{ width: number }>`
  display: inline-block;
  width: ${({ width }) => `${width}px`};
  height: 400px;
  cursor: pointer;
  overflow: hidden;
`;
