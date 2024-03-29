export interface User {
  uid: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
}

export interface UserToInviteToCourse {
  emails: Array<string>;
  course: string;
  expiry_date: Date;
  type: string;
}

export interface UserToInviteToTeam {
  emails: Array<string>;
  team: string;
  expiry_date: Date;
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

export interface UserForUpdate {
  uid: string;
  name: string;
  email: string;
}

export interface UserForSecurityUpdate {
  current_password: string;
  new_password1: string;
  new_password2: string;
}

export interface UserForPasswordReset {
  uid: string;
  email: string;
  token: string;
  new_password1: string;
  new_password2: string;
}
