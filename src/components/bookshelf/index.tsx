import { BookData, NoteData } from './types';
import MotionBook from './MotionBook';
import styled from '@emotion/styled';
import { createContext, useState } from 'react';

export interface Props {
  books?: Array<BookData>;
}

export interface BookshelfState {
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export const BookshelfContext = createContext<BookshelfState>({
  openId: null,
  setOpenId: () => {},
});

function Bookshelf({ books = BOOKS }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <BookshelfContext.Provider value={{ openId, setOpenId }}>
      <Container>
        {books.map((book) => (
          <MotionBook key={book.id} book={book} />
        ))}
      </Container>
    </BookshelfContext.Provider>
  );
}

export default Bookshelf;

const Container = styled.div`
  overflow: auto;
  white-space: nowrap;
  border: 24px solid #aa6627;
  padding: 16px;
  max-width: 100vw;
`;

const BOOKS: Array<NoteData> = [
  {
    id: 1,
    category: 'React.js',
    title: 'React Docs - Installation',
    papers: [
      { title: 'Getting Started' },
      { title: 'Add React to a Website' },
      { title: 'Create a New React App' },
      { title: 'CDN Links' },
      { title: 'Release Channels' },
    ],
  },
  {
    id: 2,
    category: 'React.js',
    title: 'React Docs - Main Concepts',
    papers: [
      { title: '1. Hello World' },
      { title: '2. Introducing JSX' },
      { title: '3. Rendering Elements' },
      { title: '4. Components and Props' },
      { title: '5. State and Lifecycle' },
      { title: '6. Handling Events' },
    ],
  },
  {
    id: 3,
    category: 'TypeScript',
    title: 'TypeScript Docs - Handbook',
    papers: [
      { title: 'The TypeScript Handbook' },
      { title: 'The Basics' },
      { title: 'Everyday Types' },
      { title: 'Narrowing' },
      { title: 'More on Functions' },
      { title: 'Object Types' },
      { title: 'Type Manipulation' },
      { title: 'Classes' },
      { title: 'Modules' },
    ],
  },
  {
    id: 4,
    category: 'TypeScript',
    title: 'TypeScript Docs - Tutorials',
    papers: [
      { title: 'ASP.NET Core' },
      { title: 'Gulp' },
      { title: 'DOM Manipulation' },
      { title: 'Migrating from JavaScript' },
      { title: 'Using Babel with TypeScript' },
    ],
  },
];
