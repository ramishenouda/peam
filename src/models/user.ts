export interface UserForRegistration {
    email: string;
    password1: string;
    password2: string;
    username: string;
}

export interface UserForLogin {
    username: string;
    password: string;
}
