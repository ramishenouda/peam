import { Student } from 'models/student';

// Describing the shape of the system's slice of state
export interface TeamState {
  uid?: string;
  name: string;
  students: Array<Student>;
  project?: any;
}

// Describing the different ACTION NAMES available
export const UPDATE_TEAM = 'UPDATE_TEAM';

interface UpdateTeamAction {
  type: typeof UPDATE_TEAM;
  payload: TeamState;
}

export type TeamActionTypes = UpdateTeamAction;
