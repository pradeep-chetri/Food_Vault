interface User {
    email: string;
    password: string;
}
export interface SignUP extends User {
    username: string;
}

export interface Login extends User {}