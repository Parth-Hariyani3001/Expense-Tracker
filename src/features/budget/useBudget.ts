import { useQuery } from "@tanstack/react-query"
import { getBudgetSummary } from "../../services/budgetService"
import { useUser } from "../../hooks/useUser";
import toast from "react-hot-toast";
import { useDatePicker } from "../../context/DatePickerContext";

export const useBudget = () => {
    const { user } = useUser();
    const { context: { range } } = useDatePicker();

    if (!user)
        throw new Error('User not authenticated, Please Login first')

    const { data: budgetSummary, error, isPending: isLoading } = useQuery({
        queryKey: ['budgetSummary', JSON.stringify(range)],
        queryFn: () => getBudgetSummary(range)
    });

    if (error)
        toast.error(error.message)

    return { budgetSummary, isLoading }
}