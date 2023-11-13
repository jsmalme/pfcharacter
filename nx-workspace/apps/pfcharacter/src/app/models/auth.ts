export interface UserCredentials {
    email: string,
    password: string,
}

export interface UserCreation extends UserCredentials {
    username: string
}

export interface LoggedInUser {
    email: string,
    token: string,
    username: string,
}