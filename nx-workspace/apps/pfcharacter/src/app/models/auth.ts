export interface UserCredentials {
    email: string,
    password: string,
}

export interface UserCreation extends UserCredentials {
    username: string
}

export interface LoggedInUser {
    token: string,
    username: string,
}