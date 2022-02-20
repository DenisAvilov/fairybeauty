/* eslint-disable getter-return */
import { createSlice, configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit"
import logger from 'redux-logger'
// import { AuthResponse } from "../models/response/AuthResponse"
import IUser from '../models/IUser'

// function noop() { }
const authInit = {
    user: IUser,
    isAuth: false,
    isLoading: false
}

const authSlice = createSlice({
    name: 'initAuth',
    initialState: authInit,
    reducers: {
        isAuth: {
            reducer: (state, { payload }) => {
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
const { isAuth: authAction } = authSlice.actions

//create reducer 
const reducer = {
    isAuthReducer: authSlice.reducer
}

const middleware = [...getDefaultMiddleware(
    {
        serializableCheck: false
    }
), logger]
// export default configureStore({
//     reducer,
//     middleware
// })