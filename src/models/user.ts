export interface UserForRegistration {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserForLogin {
    username: string;
    password: string;
}
