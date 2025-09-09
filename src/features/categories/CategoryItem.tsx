import { useState } from "react";
import type { Category, ChildCategory } from "./categoryTypes";
import CategoryContent from "./CategoryContent";
import ConfirmationModal from "../../Components/ConfirmationComponent";
import { useDeleteCategory } from "./useDeleteCategory";

function CategoryItem({
  category,
  handleEdit,
}: {
  category: Category;
  handleEdit: (category: Category | ChildCategory) => void;
}) {
  const [expand, setExpand] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const hasChildren = category.childCategories.length > 0;
  const childCategory = category.childCategories;

  const toggleExpand = () => setExpand((expand) => !expand);
  const handleDeleteModalOpen = () => {
    setDeleteOpen(true);
  };
  const handleDelete = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        setDeleteOpen(false);
      },
    });
  };

  return (
    <div className="gap-4 bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300 hover:shadow-md dark:bg-gray-800">
      <CategoryContent
        isChild={false}
        color={category.color}
        toggleExpand={toggleExpand}
        expand={expand}
        categoryName={category.categoryName}
        createdAt={category.createdAt}
        description={category.description ?? ""}
        handleEdit={handleEdit}
        category={category}
        categoryType={category.categoryType}
        handleDelete={handleDeleteModalOpen}
      />

      {hasChildren && (
        <div
          className={`dark:hover:bg-gray-700/50  transition-all duration-500 ease-in-out overflow-hidden ${
            expand ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {childCategory.map((cat) => (
            <div key={cat.id} className=" dark:bg-gray-800">
              <CategoryContent
                isChild={true}
                color={cat.color}
                toggleExpand={toggleExpand}
                expand={expand}
                categoryName={cat.categoryName}
                createdAt={cat.createdAt}
                description={cat.description ?? ""}
                handleEdit={handleEdit}
                category={cat}
                handleDelete={handleDeleteModalOpen}
              />
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Categories"
        message={`Are you sure you want to delete the category ${category.categoryName}? This action will delete all the data that is associted with this category `}
        confirmText="Delete Cateogory"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}

export default CategoryItem;
