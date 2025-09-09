import { useMutation } from "@tanstack/react-query";
import { getBudgetBreakdown as getBudgetBreakdownApi } from "../../services/budgetService";
import toast from "react-hot-toast";

export const useBudgetBreakdown = () => {
    const { mutateAsync: getBudgetBreakdown, error, isPending: isLoading } = useMutation({
        mutationFn: ({
            categoryId,
            dateFrom,
            dateTo,
        }: {
            categoryId: number;
            dateFrom: string;
            dateTo: string;
        }) => getBudgetBreakdownApi({ categoryId, dateFrom, dateTo }),
    });


    if (error)
        toast.error(error.message);

    return { getBudgetBreakdown, isLoading }
};
