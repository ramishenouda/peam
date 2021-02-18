export interface User {
    uid: string;
    username: string;
    email: string;
    full_name: string;
    avatar: string;
}

export interface UserToInviteToCourse {
    emails: Array<string>;
    course: string;
    expiry_date: Date;
    type: string;
}

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
