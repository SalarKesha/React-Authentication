export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT',
}

export const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                user: null,
                token: null,
                loading: true,
                error: null
            }
        case actionTypes.LOGIN_SUCCESS:
            const {user, token} = action.payload
            return {
                user: user,
                token: token,
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                user: null,
                token: null,
                loading: false,
                error: action.payload.error
            }
        case actionTypes.LOGOUT:
            return {
                user: null,
                token: null,
                loading: false,
                error: null
            }
        default:
            throw Error(`action type not supported: ${action}`)
    }
}