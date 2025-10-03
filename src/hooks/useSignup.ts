import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../services/authService"
import toast from "react-hot-toast"
import type { SignupProps } from "../types/authTypes";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const navigate = useNavigate();

    const { mutate: signup, isPending: isLoading } = useMutation({
        mutationFn: ({ fullName, email, password }: SignupProps) => signupApi({ fullName, email, password }),
        onSuccess: () => {
            toast.success("Account successfully created, Please verify the new account from the user's email address")
            navigate('/categories', { replace: true })
        },
        onError: (err) => toast.error(err.message)
    });

    return { signup, isLoading };
}