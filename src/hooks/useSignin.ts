import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { LoginProps } from "../types/authTypes";

export function useSignin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signin, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }: LoginProps) => signinApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user)
            navigate('/categories', { replace: true })
        },
        onError: (e) => toast.error(e.message)
    });

    return { signin, isLoading };
}