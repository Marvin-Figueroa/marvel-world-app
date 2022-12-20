import { AnyAction } from 'redux';
import { IStory } from '../models/story';

// Initial State
const initialState: IStory[] = [];

// Action types
const STORIES_LOADED = 'stories/storiesLoaded';

// Action Creators
export function storiesLoaded(stories: IStory[]) {
  return {
    type: STORIES_LOADED,
    payload: stories,
  };
}

// Reducer
export default function storiesReducer(
  state = initialState,
  action: AnyAction
): IStory[] {
  switch (action.type) {
    case STORIES_LOADED:
      return [...action.payload];

    default:
      return state;
  }
}
