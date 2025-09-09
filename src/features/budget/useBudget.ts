import { useQuery } from "@tanstack/react-query"
import { getBudgetSummary } from "../../services/budgetService"
import { useUser } from "../../hooks/useUser";
import toast from "react-hot-toast";

export const useBudget = () => {
    const { user } = useUser();

    if (!user)
        throw new Error('User not authenticated, Please Login first')

    const { data: budgetSummary, error, isPending: isLoading } = useQuery({
        queryKey: ['budgetSummary'],
        queryFn: () => getBudgetSummary()
    });

    if (error)
        toast.error(error.message)

    return { budgetSummary, isLoading }
}