import { useCallback, useEffect, useState } from "react"

//Имя создаваемого объекта в LocalStoreg
const USER_DATA = 'userData'
export const useInitialization = () => {

    //получаем токен
    const [token, setToken] = useState(null)
    //получаем userId
    const [userId, setUserId] = useState(null)

    const [ready, setReady] = useState(false)

    //Сохраняем пользователя в localStorige
    const login = useCallback((tokin, id) => {
        setToken(tokin)
        setUserId(id)

        localStorage.setItem(USER_DATA, JSON.stringify({ token: tokin, userId: id }))
        // console.log('initialization.hook localStorage tokin, login:', tokin, id)
    }, [])

    const loginOut = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(USER_DATA)
    }



    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(USER_DATA))
        if (data && data.token) {
            login(data.token, data.userId)

        }
        setReady(true)

    }, [login])



    //Возвращаяем методы
    return { login, loginOut, token, userId, ready }
}  