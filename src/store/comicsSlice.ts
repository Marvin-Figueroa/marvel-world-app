import { AnyAction } from 'redux';
import { IComic } from '../models/comic';

// Initial State
const initialState: IComic[] = [];

// Action types
const COMICS_LOADED = 'comics/comicsLoaded';

// Action Creators
export function comicsLoaded(comics: IComic[]) {
  return {
    type: COMICS_LOADED,
    payload: comics,
  };
}

// Reducer
export default function comicsReducer(
  state = initialState,
  action: AnyAction
): IComic[] {
  switch (action.type) {
    case COMICS_LOADED:
      return [...action.payload];

    default:
      return state;
  }
}
