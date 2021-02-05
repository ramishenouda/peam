export interface UserForRegistration {
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    emailPreferences: boolean;
}

export interface UserForLogin {
    username?: string;
    email?: string;
    password: string;
}
