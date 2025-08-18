import { useForm, type FieldValues } from "react-hook-form";
import type {
  Category,
  ChildCategory,
} from "../features/categories/categoryTypes";
import { colors } from "../data/colourList";

type ParentCategory = {
  categoryName: string;
  categoryId: number;
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
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      categoryName: editingCategory?.categoryName,
      color: editingCategory?.color,
      categoryDescription: editingCategory?.description,
      categorySelector: "",
    },
  });

  const selectedColor = watch("color");

  async function onSubmit(formData: FieldValues) {
    console.log(editingCategory);
    console.log(formData);
  }

  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            required={true}
            type="text"
            placeholder="Enter category name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter description (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Category
          </label>
          <select
            {...register("categorySelector")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">None (Parent Category)</option>
            {parentCategory &&
              parentCategory.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CategoryForm;
