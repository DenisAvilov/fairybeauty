import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useHttp } from '../../hooks/http.hook'

export const PostGreate = () => {
    const token = useSelector(state => state.isAuthReducer.data?.token) 

    const { request } = useHttp()
    const [ name, setName ] = useState({
       title: '',
       contant: ''
    })  
    const [ eror, setEror ] = useState({
       title: '',
       contant: ''
    })  
    const handler = (e) => {  
    setName({...name, [e.target.name] : e.target.value})   
    }

    const loginHandler = async () => {
        try {
        const data = await request(
        '/post/create',
        'POST',
        {postContent: name},
        {Authorization: `Bearer ${token}`}
        )
        console.log('loginHandler data', data, 'token:', token)
    }
    catch (e) {  console.log('Ощибака, ','посмотр на  token:', token) }
}
    const createPost = async () => {        
        if (!name.title) {
                setEror( {...eror, 'title' : 'Заполните заголовок'})             
        }
        else if (!name.contant) {
                setEror({...eror, 'contant' : 'Опишите ваш пост' })           
        }
        else {
            try{
                loginHandler()
                setName({ ...name, 'title': '', 'contant': ''})
            }
            catch(e){}
            
        }
        
        
    }
    const clear = (e) => {
        setEror({...eror, [e.target.name] : ''})       
    }
    return (
        <div>
            <div>
                <label htmlFor="title">Заголовок</label><br />
                <input type='text' id='title' name='title' onChange={handler} onClick={clear} value={name.title}/>
                {eror.title ? <div>{eror.title}</div>: null} 
            </div>
            <br />
            <div>
                <label htmlFor="contant">Чем вы хотите поделится?</label><br />
                <textarea id='contant' name='contant' onChange={handler} onClick={clear} value={name.contant}/>
                {eror.contant ? <div>{eror.contant}</div>: ''} 
            </div>
            <button onClick={createPost} > Опубликовать </button>
        </div>
    )
}