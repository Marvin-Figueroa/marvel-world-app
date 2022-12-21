import { AnyAction } from 'redux';
import { IStory } from '../models/story';

// Initial State
interface filtersType {
  character?: string;
  page?: number;
}

interface initialStateType {
  stories: IStory[];
  filters: filtersType;
  favoriteStories: IStory[];
}

const initialState: initialStateType = {
  stories: [],
  filters: {
    character: '',
    page: 1,
  },
  favoriteStories: [],
};

// Action types
const STORIES_LOADED = 'stories/storiesLoaded';
const STORIES_FILTERED_BY_CHARACTER = 'stories/storiesFilteredByCharacter';
const STORIES_FILTERED_BY_PAGE = 'stories/storiesFilteredByPage';
const STORY_BOOKMARKED = 'stories/storyBookmarked';
const STORY_UNBOOKMARKED = 'stories/storyUnBookmarked';
const STORIES_UNBOOKMARKED_ALL = 'stories/storiesUnBookmarkedAll';

// Action Creators
export function storiesLoaded(stories: IStory[]) {
  return {
    type: STORIES_LOADED,
    payload: stories,
  };
}

export function storiesFilteredByCharacter(character: string) {
  return {
    type: STORIES_FILTERED_BY_CHARACTER,
    payload: character,
  };
}

export function storiesFilteredByPage(page: number) {
  return {
    type: STORIES_FILTERED_BY_PAGE,
    payload: page,
  };
}

export function storyBookmarked(story: IStory) {
  return {
    type: STORY_BOOKMARKED,
    payload: story,
  };
}

export function storyUnBookmarked(storyId: number) {
  return {
    type: STORY_UNBOOKMARKED,
    payload: storyId,
  };
}

export function storiesUnBookmarkedAll() {
  return {
    type: STORIES_UNBOOKMARKED_ALL,
  };
}

// Reducer
export default function storiesReducer(
  state = initialState,
  action: AnyAction
): initialStateType {
  switch (action.type) {
    case STORIES_LOADED:
      return { ...state, stories: action.payload };

    case STORIES_FILTERED_BY_CHARACTER:
      return {
        ...state,
        filters: { ...state.filters, character: action.payload, page: 1 },
      };

    case STORIES_FILTERED_BY_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };

    case STORY_BOOKMARKED:
      return {
        ...state,
        favoriteStories: [...state.favoriteStories, action.payload],
      };

    case STORY_UNBOOKMARKED:
      return {
        ...state,
        favoriteStories: [
          ...state.favoriteStories.filter(
            (favStory) => favStory.id !== action.payload
          ),
        ],
      };

    case STORIES_UNBOOKMARKED_ALL:
      return {
        ...state,
        favoriteStories: [],
      };
    default:
      return state;
  }
}
