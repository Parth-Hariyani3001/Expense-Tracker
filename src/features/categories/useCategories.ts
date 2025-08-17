import { useQuery } from "@tanstack/react-query";
import { getCategoryData } from "../../services/categoryService";
import toast from "react-hot-toast";

export function useCategories() {
    const { data: categories, error, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoryData
    });

    if (error)
        toast.error(error.message)

    return { categories, isLoading }
}