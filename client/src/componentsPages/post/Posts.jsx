import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import {useHttp} from '../../hooks/http.hook'

export const Post = () => {
    const { request } = useHttp()   

    const getPost = useCallback(async () => {
        try{
            const req = await request('/post')
            console.log('post req:', req)
        }
        catch(e){ console.log('err Posts Get:', e)}
    } ,[request])
    //2.35 min
useEffect(() => {
    getPost()
}, [getPost])
    return( 
    <div>
        <h1>Posts</h1>    
    </div>  )
}
