import { CourseState, CourseActionTypes, UPDATE_COURSE } from './types'

const initialState: CourseState = {
  courseId: '',
  courseOwner: '',
  courseCode: '',
  courseTitle: '',
  courseDescription: '',
  role: ''
}

export function courseReducer(state = initialState, action: CourseActionTypes): CourseState {
  switch (action.type) {
    case UPDATE_COURSE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
