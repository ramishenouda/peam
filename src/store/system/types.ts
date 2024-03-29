// Describing the shape of the system's slice of state
export interface SystemState {
    loggedIn: boolean;
    token: string;
    username: string;
    name: string;
    user_id: string;
    jwt_id: string;
}

// Describing the different ACTION NAMES available
export const UPDATE_SESSION = "UPDATE_SESSION";

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;
