import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/categoryService";
import { useAppToast } from "../../hooks/useAppToast";


export function useCreateCategories() {
    const queryClient = useQueryClient();
    const { successToast, errorToast } = useAppToast();


    const { mutate: createCategoryApi, isPending: isLoading } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            successToast('Category created successfully');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (err) =>
            errorToast(err.message)
    });

    return { createCategoryApi, isLoading }
}