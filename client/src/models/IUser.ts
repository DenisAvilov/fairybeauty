export interface IUser {
    name?: string,
    lastName?: string,
    email: string,
    // roles: Array<string>,
    roles: string,
    id: string,
    //подтверждение почты
    isActivated: boolean
    subscription: boolean
}