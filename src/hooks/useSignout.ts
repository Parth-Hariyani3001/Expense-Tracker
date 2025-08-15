import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationFn: logoutApi,
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/signin', { replace: true });
        }
    });

    return { logout, isLoading }
}