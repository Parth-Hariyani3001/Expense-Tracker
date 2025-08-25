import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/categoryService";
import toast from "react-hot-toast";


export function useCreateCategories() {
    const queryClient = useQueryClient();

    const { mutate: createCategoryApi, isPending: isLoading } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            toast.success('Category created successfully');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (err) =>
            toast.error(err.message)
    });

    return { createCategoryApi, isLoading }
}