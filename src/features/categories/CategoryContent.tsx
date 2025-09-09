import { ChevronRight, Edit2, Tag, Trash2 } from "lucide-react";
import type { Category, CategoryType, ChildCategory } from "./categoryTypes";

function CategoryContent({
  color,
  isChild,
  toggleExpand,
  categoryName,
  description,
  createdAt,
  expand,
  handleEdit,
  category,
  categoryType,
  handleDelete,
}: {
  isChild: boolean;
  color: string;
  toggleExpand: () => void;
  categoryName: string;
  description: string;
  expand: boolean;
  createdAt: string;
  handleEdit: (category: Category | ChildCategory) => void;
  category: ChildCategory | Category;
  categoryType?: CategoryType;
  handleDelete: () => void;
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "expense":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "debt":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "investment":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${
        isChild ? "ml-8 border-l-4 rounded-r-lg mb-2" : ""
      } ${isChild ? "ml-8 border-l-4 rounded-r-lg mb-2 pt-2" : ""}`}
      style={isChild ? { borderLeftColor: color } : {}}
    >
      <div className="flex items-center space-x-3 flex-1">
        {!isChild && (
          <button onClick={toggleExpand}>
            <div
              className={`p-2 hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm rounded-lg transition-all duration-200 group ${
                expand ? "rotate-90" : "rotate-0"
              }`}
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
            </div>
          </button>
        )}

        <div
          className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white dark:ring-gray-700"
          style={{ backgroundColor: color }}
        ></div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            {categoryName}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
              Created: {createdAt.split("T").at(0)}
            </span>
            <span
              className={`flex items-center ${
                isChild
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
              } px-2 py-1 rounded-full`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {isChild ? "Sub Category" : "Parent Category"}
            </span>
            {!isChild && categoryType && (
              <span
                className={`flex items-center px-2 py-1 rounded-full font-medium ${getTypeColor(
                  categoryType
                )}`}
              >
                {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleEdit(category)}
          className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 hover:shadow-sm"
        >
          <Edit2 className="w-4 h-4 transition-transform hover:scale-110" />
        </button>
        {/* onClick={() => handleDelete(category.id)} */}
        <button
          onClick={handleDelete}
          className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 hover:shadow-sm"
        >
          <Trash2 className="w-4 h-4 transition-transform hover:scale-110" />
        </button>
      </div>
    </div>
  );
}

export default CategoryContent;
