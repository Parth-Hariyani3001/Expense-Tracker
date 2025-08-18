import { ChevronRight, Edit2, Tag, Trash2 } from "lucide-react";
import type { Category, ChildCategory } from "./categoryTypes";

function CategoryContent({
  color,
  isChild,
  hasChildren,
  toggleExpand,
  categoryName,
  description,
  createdAt,
  expand,
  handleEdit,
  category,
}: {
  isChild: boolean;
  hasChildren: boolean;
  color: string;
  toggleExpand: () => void;
  categoryName: string;
  description: string;
  expand: boolean;
  createdAt: string;
  handleEdit: (category: Category | ChildCategory) => void;
  category: ChildCategory | Category;
}) {
  function placeholderFunction() {
    console.log("called");
  }
  return (
    <div
      className={`flex items-center gap-4 justify-between p-5 hover:bg-gray-50 transition-all duration-200 border-l-4 bg-gray-50/50 rounded-r-lg mb-2 ${
        isChild ? "ml-8 border-l-4 bg-gray-50/50 rounded-r-lg mb-2" : ""
      }`}
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center space-x-3 flex-1">
        {hasChildren && (
          <button onClick={toggleExpand}>
            <div
              className={`transform transition-transform duration-300 ${
                expand ? "rotate-90" : "rotate-0"
              }`}
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </div>
          </button>
        )}

        <div
          className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white"
          style={{ backgroundColor: color }}
        ></div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">
            {categoryName}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              Created: {createdAt.split("T").at(0)}
            </span>
            <span
              className={`flex items-center ${
                isChild
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-600"
              } px-2 py-1 rounded-full`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {isChild ? "Sub Category" : "Parent Category"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleEdit(category)}
          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-sm"
        >
          <Edit2 className="w-4 h-4 transition-transform hover:scale-110" />
        </button>
        {/* onClick={() => handleDelete(category.id)} */}
        <button
          onClick={placeholderFunction}
          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
        >
          <Trash2 className="w-4 h-4 transition-transform hover:scale-110" />
        </button>
      </div>
    </div>
  );
}

export default CategoryContent;
