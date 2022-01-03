import { useCallback, useState } from "react"

export const useHttp = () => {

    const [loading, setLoading] = useState(false)

    //обработка ошибок
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'

            }

            const response = await fetch(url, { method, body, headers })
            // debugger
            //Парсим полученный объект
            // debugger
            const data = await response.json()
            if (!response.ok) {

                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        }
        catch (e) {
            setLoading(false)
            setError(e.message)
            //Выкидываем ошибку для ее обработки
            throw e
        }
    },
        [])

    //Чистим ошибки
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}