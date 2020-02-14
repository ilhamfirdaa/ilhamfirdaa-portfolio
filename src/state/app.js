const initialState = {
  isMounting: false,
}

const TOGGLE_MOUNTING = 'TOGGLE_MOUNTING'
export const toggleMounting = (isMounting) => ({
  type: TOGGLE_MOUNTING, isMounting,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOUNTING:
      return { ...state, isMounting: action.isMounting }
    default:
      return state
  }
}
