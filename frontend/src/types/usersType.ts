interface User {
    email: string;
    password: string;
}
export interface SignUP extends User {
    name: string;
}

export interface Login extends User {}