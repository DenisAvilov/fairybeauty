/* eslint-disable getter-return */
import { createSlice, configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit"
import logger from 'redux-logger'


function noop() { }
const initAuth = {
    login: noop,
    loginOut: noop,
    token: null,
    userId: null,
    ready: false,
    isAuthenticated: false
}


const authSlice = createSlice({
    name: 'initAuth',
    initialState: initAuth,
    reducers: {
        isAuth: {
            reducer: (state, { payload }) => {
                // eslint-disable-next-line no-unused-expressions
                // console.log('reducer', payload)
                // console.log('reducer state', state)
                state = payload
                return state
            },
            prepare: (data) => {
                // console.log('data', data)
                return {
                    payload: {
                        data
                    }
                }
            }
        }

    }
})
//create action
export const { isAuth: authAction } = authSlice.actions

//create reducer 
const reducer = {
    isAuthReducer: authSlice.reducer
}

const middleware = [...getDefaultMiddleware(
    {
        serializableCheck: false
    }
), logger]
export default configureStore({
    reducer,
    middleware
})