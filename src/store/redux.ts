import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { systemReducer } from './system/reducers';
import { courseReducer } from './course/reducers';
import { teamReducer } from './team/reducers';

const rootReducer = combineReducers({
  system: systemReducer,
  course: courseReducer,
  team: teamReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools());

  return store;
}
