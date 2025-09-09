import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/categoryService";
import { useAppToast } from "../../hooks/useAppToast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useAppToast();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      successToast("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["budgetSummary"] });
    },
    onError: (err) => {
      errorToast(err.message);
    },
  });

  return { deleteCategory, isDeleting };
}
