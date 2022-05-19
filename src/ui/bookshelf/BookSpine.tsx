import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useCallback } from 'react';

import { useBookContext } from './Book';
import { useBookshelfContext } from '.';

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

function BookSpine() {
  const { openId, setOpenId } = useBookshelfContext();
  const {
    id,
    width,
    color: { light, text },
    title,
    category,
  } = useBookContext();
  const isOpened = openId === id;

  const open = useCallback(() => {
    setOpenId(id);
  }, [id, setOpenId]);

  return (
    <Container
      {...{
        width,
        initial: false,
        animate: isOpened ? 'open' : 'close',
        variants,
        onClick: open,
        lightColor: light,
        textColor: text,
      }}
    >
      <div>
        <span>{title}</span>
        <span>{category}</span>
      </div>
    </Container>
  );
}

export default BookSpine;

const Container = styled(motion.div)<{
  width: number;
  lightColor: string;
  textColor: string;
}>`
  display: inline-block;
  width: ${({ width }) => `${width}px`};
  height: 100%;
  writing-mode: vertical-lr;
  transform-origin: left center;
  background-color: ${({ lightColor }) => `${lightColor}`};
  color: ${({ textColor }) => `${textColor}`};

  > div {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0px;
    font-weight: 900;
  }
`;
