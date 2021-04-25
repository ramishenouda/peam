import { CourseState, CourseActionTypes, UPDATE_COURSE } from './types'

const initialState: CourseState = {
  ownerId: '',
  id: '',
  owner: '',
  code: '',
  title: '',
  description: '',
  role: '',
  attachments: [],
  requirements: [],
  teachers: [],
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
