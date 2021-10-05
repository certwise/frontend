import * as types from './types'

const reducer = (state, action) => {
    switch (action.type) {

        case types.SET_CURRENT_CERTIFICATE:
            return {
                ...state,
                currentCertificate: action.payload
            }


        default: return state
    }
}

export default reducer