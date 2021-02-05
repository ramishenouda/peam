import { CourseState, CourseActionTypes, UPDATE_COURSE } from './types'

export const updateCourse = (newSession: CourseState): CourseActionTypes => {
  return {
    type: UPDATE_COURSE,
    payload: newSession
  }
}
