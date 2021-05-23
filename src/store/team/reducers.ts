import { TeamState, TeamActionTypes, UPDATE_TEAM } from './types';

const initialState: TeamState = {
  name: '',
  students: [],
};

export function teamReducer(
  state = initialState,
  action: TeamActionTypes
): TeamState {
  switch (action.type) {
    case UPDATE_TEAM: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
