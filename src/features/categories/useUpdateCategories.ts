import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

export function useUpdateCategories() {
    const queryClient = useQueryClient();

    const { mutate: editCategoryApi, isPending: isLoading } = useMutation({
        mutationFn: editCategories,
        onSuccess: () => {
            toast.success('Category updated successfully');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (err) =>
            toast.error(err.message)
    });

    return { editCategoryApi, isLoading }
}