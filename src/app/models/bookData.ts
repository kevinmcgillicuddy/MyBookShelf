export interface BookData {
  Author: string;
  Category: string;
  Loan: boolean;
  Owned: boolean;
  ReadingNow: boolean;
  Title: string;
  isbn: string;
  pages: number;
  year_read: number;
  img_url?: string;
  fsId: string;
}
