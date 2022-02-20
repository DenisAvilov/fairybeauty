import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:5000'

const $api = axios.create({
    // автомаотческое прицепление куков для полей. авт отправление куков с запросом
    baseURL: API_URL,
    withCredentials: true,
    // headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
})

//interceptor на запрос. confiq - instans axios
$api.interceptors.request.use( function (config) {  
    config.headers = {Authorization: `Bearer ${localStorage.getItem('token')}`}
    return config
})

$api.interceptors.response.use((config)=>{  
    return config
},
async (error) => {
    //Проверяем исходный запрос
    
  const originalRequest =  error.config
  //Проверяем статус код
    if(error.response.status === 401 && error.config && !error.config._isRetry){
      try{
      const response = await axios.get<AuthResponse>(`${API_URL}/api/refresh`,{withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      //если originalRequest вернет 401 то интерцептор опять отработает и все зациклитца. 
      //поэтому добавляем проверки в условие && error.config && !error.config._isRetry
      return $api.request(originalRequest)
    }
      catch(e: any){console.log('НЕ АВТОРИЗОВАН', e)}
  }
  // если if не отработал пробрасываем ошибку на верхний уровень
  // это ошибне у которой не 401 статус код
  throw error;
})
export default $api
