export interface UserForRegistration {
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    role: string;
    emailPreferences: boolean;
}
