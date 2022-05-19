import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useCallback } from 'react';

import { EASING } from './common';
import { useBookshelfContext } from '.';
import { useBookContext } from './Book';

function BookCover() {
  const { openId, setOpenId } = useBookshelfContext();
  const { id, color, title, category, width } = useBookContext();
  const isOpen = openId === id;

  const close = useCallback(() => {
    setOpenId(null);
  }, [setOpenId]);

  return (
    <Container
      {...{
        initial: false,
        custom: width,
        animate: isOpen ? 'open' : 'close',
        variants: {
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
        },
        onClick: close,
        primaryColor: color.primary,
        textColor: color.text,
      }}
    >
      <div>
        <Category>{category}</Category>
        <Title>{title}</Title>
      </div>
    </Container>
  );
}

export default BookCover;

const Container = styled(motion.div)<{
  primaryColor: string;
  textColor: string;
}>`
  padding: 32px 16px;
  display: inline-block;
  width: 400px;
  height: 100%;
  background-color: ${({ primaryColor }) => `${primaryColor}`};
  color: ${({ textColor }) => `${textColor}`};
  transform-origin: left center;
  vertical-align: top;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  white-space: normal;
`;
