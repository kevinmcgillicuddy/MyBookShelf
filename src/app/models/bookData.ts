export interface BookData {
  Author: string;
  Category: 'Fiction' | 'Non Fiction' | 'Theology';
  Loan: boolean;
  Owned: boolean;
  ReadingNow: boolean;
  Title: string;
  isbn: string;
  pages: number;
  year_read: number;
  img_url?: string;
  docId?: string;
}
