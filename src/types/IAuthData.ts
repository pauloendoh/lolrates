export interface IAuthData {
    username: string,
    email: string,
    password: string,
    password2: string,
}

export const newAuthData = (): IAuthData => (
    {
        username: "",
        email: "",
        password: "",
        password2: "",
    }
)