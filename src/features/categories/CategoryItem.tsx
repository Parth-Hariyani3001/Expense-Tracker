import { useState } from "react";
import { ChevronRight, Edit2, Tag, Trash2 } from "lucide-react";
import type { Categories } from "./categoryTypes";

function CategoryItem({ category }: { category: Categories }) {
  const [expand, setExpand] = useState(false);
  const hasChildren = category.child_categories.length > 0;
  const childCategory = category.child_categories;

  const toggleExpand = () => setExpand((expand) => !expand);

  const placeholderFunction = () => {
    console.log("clicked");
  };
  console.log(hasChildren);

  console.log(category);
  return (
    <div className="gap-4 bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div
        className="flex items-center justify-between p-5 hover:bg-gray-50 transition-all duration-200 ml-6 border-l-4 bg-gray-50/50"
        style={{ borderLeftColor: category.color }}
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
            style={{ backgroundColor: category.color }}
          ></div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {category.parent_category_name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {category.description}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                Created: {category.created_at.split("T").at(0)}
              </span>
              <span className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded-full">
                <Tag className="w-3 h-3 mr-1" />
                Parent Category
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* onClick={() => handleEdit(category)} */}
          <button
            onClick={placeholderFunction}
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
      {hasChildren && (
        <div
          className={`bg-gradient-to-r from-gray-50 to-gray-100/50 transition-all duration-500 ease-in-out overflow-hidden ${
            expand ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {childCategory.map((cat) => (
            <div key={cat.id} className="pt-2">
              <div
                style={{ borderLeftColor: cat.color }}
                className="flex items-center gap-4 justify-between p-5 hover:bg-gray-50 transition-all duration-200 ml-8 border-l-4 bg-gray-50/50 rounded-r-lg mb-2"
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white"
                  style={{ backgroundColor: cat.color }}
                ></div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {cat.child_category_name}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      Created: {cat.created_at.split("T").at(0)}
                    </span>

                    <span className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      <Tag className="w-3 h-3 mr-1" />
                      Subcategory
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
