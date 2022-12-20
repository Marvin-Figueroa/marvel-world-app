import { AnyAction } from 'redux';
import { ICharacter } from '../models/character';

// Initial State
const initialState: ICharacter[] = [];

// Action types
const CHARACTERS_LOADED = 'characters/charactersLoaded';

// Action Creators
export function charactersLoaded(characters: ICharacter[]) {
  return {
    type: CHARACTERS_LOADED,
    payload: characters,
  };
}

// Reducer
export default function charactersReducer(
  state = initialState,
  action: AnyAction
): ICharacter[] {
  switch (action.type) {
    case CHARACTERS_LOADED:
      return [...action.payload];

    default:
      return state;
  }
}
