import { SystemState, UPDATE_SESSION, SystemActionTypes } from './types'

export const updateSession = (newSession: SystemState): SystemActionTypes => {
  console.log(newSession);
  return {
    type: UPDATE_SESSION,
    payload: newSession
  }
}
