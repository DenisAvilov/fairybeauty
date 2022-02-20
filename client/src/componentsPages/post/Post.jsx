import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import {useHttp} from '../../hooks/http.hook'

export const Post = () => {
    const { request } = useHttp()   

    const getPost = useCallback(async () => {
        const req = await request('/post')
        console.log('post req:', req) 
    } ,[request])
    
useEffect(() => {
    getPost()
}, [getPost])
    return( 
    <div>
        <h1>Post</h1>
    </div>  )
}
