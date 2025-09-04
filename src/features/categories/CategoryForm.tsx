import { useForm, type FieldValues } from "react-hook-form";
import type { Category, CategoryType, ChildCategory } from "./categoryTypes";
import { colors } from "../../data/colourList";
import { categoryTypeList } from "../../data/categoryType";
import { useUser } from "../../hooks/useUser";
import toast from "react-hot-toast";
import { useCreateCategories } from "./useCreateCategories";
import { useUpdateCategories } from "./useUpdateCategories";

type ParentCategory = {
  categoryName: string;
  categoryId: number;
  categoryType: CategoryType;
}[];

function CategoryForm({
  editingCategory,
  resetForm,
  parentCategory,
}: {
  editingCategory: Category | ChildCategory | null;
  resetForm: () => void;
  parentCategory: ParentCategory | undefined;
}) {
  const { user } = useUser();
  const { createCategoryApi, isLoading: isCreating } = useCreateCategories();
  const { editCategoryApi, isLoading: isUpdating } = useUpdateCategories();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      categoryName: editingCategory?.categoryName,
      color: editingCategory?.color,
      categoryDescription: editingCategory?.description,
      categoryType:
        editingCategory && "categoryType" in editingCategory
          ? editingCategory.categoryType
          : categoryTypeList.at(0),
      categorySelector:
        editingCategory && "parentId" in editingCategory
          ? editingCategory.parentId
          : "",
    },
  });

  const selectedColor = watch("color");
  const selectedCategory = watch("categorySelector");

  const isChild =
    editingCategory !== null && "parentId" in editingCategory ? true : false;

  async function onSubmit(formData: FieldValues) {
    if (!user) {
      toast.error("You are not authenticated, please login!");
      return;
    }

    // This is used to get the parent category if it is a child
    const parentCat =
      selectedCategory === ""
        ? null
        : parentCategory &&
          parentCategory.find(
            (cat) => cat.categoryId === parseInt(formData.categorySelector)
          );

    // This is used to get the category type
    const catType =
      selectedCategory === "" ? formData.categoryType : parentCat?.categoryType;

    // this is used to get the parentId
    const parentId = formData.categorySelector || parentCat?.categoryId;

    const data = {
      category_name: formData.categoryName,
      color: formData.color ?? "#ef4444",
      description: formData.categoryDescription,
      parent_id: parentId && parseInt(parentId),
      category_type: catType,
      user_id: user?.id,
    };

    // INSERT
    if (!editingCategory) {
      createCategoryApi({ categoryBody: data });
    }

    // UPDATE
    if (editingCategory) {
      editCategoryApi({ categoryBody: data, id: editingCategory.id });
    }

    // Finally resetting the form
    resetForm();
  }

  return (
    <>
      <div className="p-6 border-b  dark:bg-gray-800 border-gray-200 transition-colors duration-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-4 dark:bg-gray-800 transition-colors duration-300"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Category Name *
          </label>
          <input
            required={true}
            type="text"
            placeholder="Enter category name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
            {...register("categoryName", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Category should be of atleast 3 characters",
              },
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Enter description (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
            {...register("categoryDescription", {
              minLength: {
                value: 3,
                message:
                  "Category description should be of atleast 3 characters",
              },
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Parent Category
          </label>
          <select
            {...register("categorySelector")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
          >
            {/* This option points to parent category */}
            {!isChild && <option value="">(Parent Category)</option>}

            {/* This option points to child category */}
            {parentCategory &&
              (isChild || editingCategory === null) &&
              parentCategory.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>

        {(!isChild || !editingCategory) && selectedCategory === "" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Category Type
            </label>

            <select
              {...register("categoryType")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
            >
              {categoryTypeList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Color
          </label>
          <div className="grid grid-cols-9 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setValue("color", color, { shouldValidate: true })
                }
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-gray-400 scale-110"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:hover:text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isCreating || isUpdating}
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CategoryForm;
