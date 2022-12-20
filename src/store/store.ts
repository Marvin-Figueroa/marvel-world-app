import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootReducer from './reducer';

const store = createStore(rootReducer, devToolsEnhancer());

export type RootState = ReturnType<typeof rootReducer>;

export default store;
