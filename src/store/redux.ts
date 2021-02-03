import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import { systemReducer } from './system/reducers'

const rootReducer = combineReducers({
    system: systemReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools());

    return store;
}
