import { createContext, useContext, useState } from 'react';
import styled from '@emotion/styled';

import Book from './Book';
import { BookData } from './types';

export interface BookshelfState {
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export const BookshelfContext = createContext<BookshelfState | null>(null);

export const useBookshelfContext = () => {
  const context = useContext(BookshelfContext);
  if (!context) {
    throw new Error('BookshelfContext not found.');
  }
  return context;
};

export interface BookshelfProps {
  books?: BookData[];
}

function Bookshelf({ books }: BookshelfProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <BookshelfContext.Provider value={{ openId, setOpenId }}>
      <Container>
        {books?.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </Container>
    </BookshelfContext.Provider>
  );
}

export default Bookshelf;

const Container = styled.div`
  max-width: 100vw;
  padding: 16px;
  overflow: auto;
  white-space: nowrap;
  border: 24px solid #aa6627;
`;
