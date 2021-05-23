import { TeamState, TeamActionTypes, UPDATE_TEAM } from './types';

export const updateTeam = (newSession: TeamState): TeamActionTypes => {
  return {
    type: UPDATE_TEAM,
    payload: newSession,
  };
};
