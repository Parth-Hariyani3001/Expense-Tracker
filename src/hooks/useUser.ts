import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";
import toast from "react-hot-toast";

export function useUser() {
    const { data: user, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });

    if (error)
        toast.error(error.message);

    return { user, isLoading, isAuthenticated: user?.role === 'authenticated' }
}