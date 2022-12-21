import { AnyAction } from 'redux';
import { IComic } from '../models/comic';

// Initial State
interface filtersType {
  title?: string;
  format?: string;
  page?: number;
}
interface initialStateType {
  comics: IComic[];
  filters: filtersType;
  favoriteComics: IComic[];
}

const initialState: initialStateType = {
  comics: [],
  filters: {
    title: '',
    format: '',
    page: 1,
  },
  favoriteComics: [],
};

// Action types
const COMICS_LOADED = 'comics/comicsLoaded';
const COMICS_FILTERED_BY_FORMAT = 'comics/comicsFilteredByFormat';
const COMICS_FILTERED_BY_TITLE = 'comics/comicsFilteredByTitle';
const COMICS_FILTERED_BY_PAGE = 'comics/comicsFilteredByPage';
const COMIC_BOOKMARKED = 'comics/comicBookmarked';
const COMIC_UNBOOKMARKED = 'comics/comicUnBookmarked';
const COMICS_UNBOOKMARKED_ALL = 'comics/comicsUnBookmarkedAll';

// Action Creators
export function comicsLoaded(comics: IComic[]) {
  return {
    type: COMICS_LOADED,
    payload: comics,
  };
}

export function comicsFilteredByFormat(format: string) {
  return {
    type: COMICS_FILTERED_BY_FORMAT,
    payload: format,
  };
}

export function comicsFilteredByTitle(title: string) {
  return {
    type: COMICS_FILTERED_BY_TITLE,
    payload: title,
  };
}

export function comicsFilteredByPage(page: number) {
  return {
    type: COMICS_FILTERED_BY_PAGE,
    payload: page,
  };
}

export function comicBookmarked(comic: IComic) {
  return {
    type: COMIC_BOOKMARKED,
    payload: comic,
  };
}

export function comicUnBookmarked(comicId: number) {
  return {
    type: COMIC_UNBOOKMARKED,
    payload: comicId,
  };
}

export function comicsUnBookmarkedAll() {
  return {
    type: COMICS_UNBOOKMARKED_ALL,
  };
}

// Reducer
export default function comicsReducer(
  state = initialState,
  action: AnyAction
): initialStateType {
  switch (action.type) {
    case COMICS_LOADED:
      return { ...state, comics: action.payload };

    case COMICS_FILTERED_BY_FORMAT:
      return {
        ...state,
        filters: { ...state.filters, format: action.payload, page: 1 },
      };

    case COMICS_FILTERED_BY_TITLE:
      return {
        ...state,
        filters: { ...state.filters, title: action.payload, page: 1 },
      };

    case COMICS_FILTERED_BY_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };

    case COMIC_BOOKMARKED:
      return {
        ...state,
        favoriteComics: [...state.favoriteComics, action.payload],
      };

    case COMIC_UNBOOKMARKED:
      return {
        ...state,
        favoriteComics: [
          ...state.favoriteComics.filter(
            (favComic) => favComic.id !== action.payload
          ),
        ],
      };

    case COMICS_UNBOOKMARKED_ALL:
      return {
        ...state,
        favoriteComics: [],
      };

    default:
      return state;
  }
}
