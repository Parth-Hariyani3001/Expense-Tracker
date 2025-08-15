export interface LoginProps {
    email: string;
    password: string;
}

export interface SignupProps extends LoginProps {
    fullName: string;
}