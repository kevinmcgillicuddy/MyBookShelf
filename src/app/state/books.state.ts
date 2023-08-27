import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { BookData } from "../models/bookData";

export namespace Books {
  export class SetBooks {
    static readonly type = '[Angular Fire Service] Set Book Data';

    constructor(public payload: BookData[]) {}
  }
export interface BookStateModel {
  books: BookData[];
}
  const defaultState = {
    books: [],
  };
  @State<BookStateModel>({
    name: 'bookdata',
    defaults: defaultState,
  })
  @Injectable()
  export class BookState {

    @Selector()
    static books(state: BookStateModel): BookData[] {
      return state.books;
    }


    @Action(SetBooks)
    setBooks(
      { setState }: StateContext<BookStateModel>,
      { payload }: SetBooks
    ) {
      setState(
        patch<BookStateModel>({
          books: payload
        })
      );
    }

  }

}
