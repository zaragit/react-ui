import { createContext, useState } from 'react';
import styled from '@emotion/styled';

import Book from './Book';
import { BookData } from '../bookshelf/types';

export interface BookshelfState {
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export const BookshelfContext = createContext<BookshelfState>({
  openId: null,
  setOpenId: () => {},
});

export interface BookshelfProps {
  books?: BookData[];
}

function Bookshelf({ books }: BookshelfProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <BookshelfContext.Provider value={{ openId, setOpenId }}>
      <Container>
        {books?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Container>
    </BookshelfContext.Provider>
  );
}

export default Bookshelf;

const Container = styled.div`
  display: flex;
  gap: 16px;
  max-width: 100vw;
  overflow: auto;
  padding: 16px;
  border: 24px solid #aa6627;
`;
