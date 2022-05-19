export interface BookData {
  id: number;
  category: string;
  title: string;
  papers: Array<PaperData>;
}

export type NoteData = BookData;

export interface PaperData {
  title: string;
}
