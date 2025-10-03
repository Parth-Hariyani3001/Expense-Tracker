import { useQuery } from "@tanstack/react-query";
import { getParentCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

export function useParentCategories() {
    const { data: parentCategories, error, isLoading } = useQuery({
        queryKey: ['parent_categories'],
        queryFn: getParentCategories
    });

    if (error)
        toast.error(error.message)

    return { parentCategories, isLoading }
}