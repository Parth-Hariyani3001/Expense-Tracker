import { FolderPlus, MoreVertical, Plus, Tag } from "lucide-react";
import Button from "../../Components/Button";
import type { Category } from "./categoryTypes";
import CategoryStatItem from "./CategoryStatItem";

function CategoryHeader({
  handleShowModal,
  categories,
}: {
  handleShowModal: () => void;
  categories: Category[];
}) {
  // get the count of all the child items for a particular parent category
  const getChildCategoryCount = () =>
    categories.reduce((acc, cat) => acc + cat.childCategories.length, 0);

  // get the count of all the child items plus the count of that current parent category
  const getTotalCategoryCount = () =>
    categories.reduce((acc, cat) => acc + cat.childCategories.length + 1, 0);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">
            Manage your expense categories and subcategories.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            type="button"
            buttonDesign="primary"
            onClick={handleShowModal}
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Button>
        </div>
      </div>

      {/* Stats card */}
      {categories && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryStatItem
            lengthProperty={categories.length}
            description="Parent categories"
            Icon={FolderPlus}
            iconColor="blue"
          />

          <CategoryStatItem
            lengthProperty={getChildCategoryCount()}
            description="Sub categories"
            Icon={Tag}
            iconColor="green"
          />

          <CategoryStatItem
            lengthProperty={getTotalCategoryCount()}
            description="Total categories"
            Icon={MoreVertical}
            iconColor="purple"
          />
        </div>
      )}
    </>
  );
}

export default CategoryHeader;
