import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useCallback, useContext } from 'react';
import { BookshelfContext } from '.';
import { BookData } from '../bookshelf/types';
import { extractColorByTitleLength } from './colors';

export interface BookCoverProps {
  book: BookData;
}

const EASING = { duration: 1, ease: [0.45, 0, 0.55, 1] };

const variants = {
  open: (width: number) => ({
    rotateY: 0,
    translateX: -width,
    transition: EASING,
  }),
  close: {
    rotateY: -90,
    translateX: 0,
    transition: EASING,
  },
};

const calculateBookWidth = (papersLength: number) => {
  return papersLength <= 5 ? 60 : 60 + 8 * papersLength;
};

function BookCover({ book }: BookCoverProps) {
  const { openId, setOpenId } = useContext(BookshelfContext);
  const color = extractColorByTitleLength(book.title);
  const width = calculateBookWidth(book.papers.length);
  const isOpened = openId === book.id;

  console.log(color);

  const close = useCallback(() => {
    setOpenId(book.id);
  }, [book.id, setOpenId]);

  return (
    <Container
      {...{
        initial: false,
        custom: width,
        animate: isOpened ? 'open' : 'close',
        variants,
        onClick: close,
        ...color,
      }}
    >
      <div>
        <h3>{book.category}</h3>
        <h1>{book.title}</h1>
      </div>
    </Container>
  );
}

export default BookCover;

const Container = styled(motion.div)<{
  primary: string;
  light: string;
  text: string;
}>`
  display: inline-block;
  width: 400px;
  height: 100%;
  vertical-align: top;
  background-color: ${({ primary }) => `${primary}`};
  transform-origin: left center;
  transform: rotate(-90deg);
  color: ${({ text }) => `${text}`};

  white-space: normal;

  > div {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 16px;

    > * {
      overflow: hidden;
      word-wrap: break-word;
    }
  }
`;
