import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {

    static async registration(
        email: string, 
        password: string, 
        firstName: string, 
        lastName: string,
        subscription: boolean
        ): Promise<AxiosResponse<AuthResponse>>{
            console.log('subscription^', subscription)
        //Для отправки запроса нам понадобитца инстанс аксиоса
        return $api.post<AuthResponse>('/api/registration', {
            email, 
            password, 
            firstName, 
            lastName, 
            subscription
        })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return await $api.post<AuthResponse>('/api/login', {email, password})        
    }
    static async logout(): Promise<void>{
        //Для отправки запроса нам понадобитца инстанс аксиоса
        return $api.post('/api/logout')
    }

}