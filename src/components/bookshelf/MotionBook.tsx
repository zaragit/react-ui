import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { BookshelfContext } from '.';
import { BookData } from './types';

const PASTEL_COLORS = [
  { color: '#f44336', lightColor: '#e57373', text: '#ffffff' },
  { color: '#795548', lightColor: '#a1887f', text: '#ffffff' },
  { color: '#ff9800', lightColor: '#ffb74d', text: '#ffffff' },
  { color: '#cddc39', lightColor: '#dce775', text: '#ffffff' },
  { color: '#4caf50', lightColor: '#81c784', text: '#ffffff' },
  { color: '#03a9f4', lightColor: '#4fc3f7', text: '#ffffff' },
  { color: '#3f51b5', lightColor: '#7986cb', text: '#ffffff' },
  { color: '#673ab7', lightColor: '#9575cd', text: '#ffffff' },
  { color: '#9c27b0', lightColor: '#ba68c8', text: '#ffffff' },
];

const EASING = { duration: 1, ease: [0.45, 0, 0.55, 1] };

export interface MotionBookProps {
  book: BookData;
}

function MotionBook({ book }: MotionBookProps) {
  const { openId, setOpenId } = useContext(BookshelfContext);

  const { id, title, category, papers } = book;
  const papersLength = papers.length;
  const { color, lightColor, text } = PASTEL_COLORS[title.length % 10];
  const width = papersLength <= 5 ? 60 : 60 + 8 * papersLength;
  const open = openId === id;

  return (
    <Container
      {...{ width, color, lightColor, text }}
      initial={false}
      animate={open ? 'open' : 'closed'}
      variants={{
        open: {
          width: 400,
          transition: EASING,
        },
        closed: { width, transition: EASING },
      }}
    >
      <motion.div
        className="book-side"
        initial={false}
        onClick={() => setOpenId(id)}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: {
            rotateY: 90,
            transition: EASING,
          },
          closed: {
            rotateY: 0,
            transition: EASING,
          },
        }}
      >
        <div>
          <span className="book-title">{book.title}</span>
          <span className="book-category">{book.category}</span>
        </div>
      </motion.div>
      <motion.div
        className="book-front"
        initial={false}
        onClick={() => setOpenId(null)}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: {
            rotateY: 0,
            translateX: -width,
            transition: EASING,
          },
          closed: {
            rotateY: -90,
            translateX: 0,
            transition: EASING,
          },
        }}
      >
        <div>
          <h3>{category}</h3>
          <h1>{title}</h1>
        </div>
      </motion.div>
    </Container>
  );
}

export default MotionBook;

const Container = styled(motion.div)<{
  width: number;
  color: string;
  lightColor: string;
  text: string;
}>`
  display: inline-block;
  width: ${({ width }) => `${width}px`};
  height: 400px;
  cursor: pointer;
  overflow: hidden;

  .book-side {
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
      background-color: ${({ lightColor }) => `${lightColor}`};
      color: ${({ text }) => `${text}`};
    }
  }

  .book-front {
    display: inline-block;
    width: 400px;
    height: 100%;
    vertical-align: top;
    background-color: ${({ color }) => `${color}`};
    transform-origin: left center;
    transform: rotate(-90deg);
    color: ${({ text }) => `${text}`};

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
  }
`;
