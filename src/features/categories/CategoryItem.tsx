import { useState } from "react";
import type { Category, ChildCategory } from "./categoryTypes";
import CategoryContent from "./CategoryContent";

function CategoryItem({
  category,
  handleEdit,
}: {
  category: Category;
  handleEdit: (category: Category | ChildCategory) => void;
}) {
  const [expand, setExpand] = useState(false);
  const hasChildren = category.childCategories.length > 0;
  const childCategory = category.childCategories;

  const toggleExpand = () => setExpand((expand) => !expand);

  return (
    <div className="gap-4 bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300 hover:shadow-md">
      <CategoryContent
        isChild={false}
        color={category.color}
        hasChildren={true}
        toggleExpand={toggleExpand}
        expand={expand}
        categoryName={category.categoryName}
        createdAt={category.createdAt}
        description={category.description ?? ""}
        handleEdit={handleEdit}
        category={category}
      />

      {hasChildren && (
        <div
          className={`bg-gradient-to-r from-gray-50 to-gray-100/50 transition-all duration-500 ease-in-out overflow-hidden ${
            expand ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {childCategory.map((cat) => (
            <div key={cat.id} className="pt-2">
              <CategoryContent
                isChild={true}
                color={cat.color}
                hasChildren={false}
                toggleExpand={toggleExpand}
                expand={expand}
                categoryName={cat.categoryName}
                createdAt={cat.createdAt}
                description={cat.description ?? ""}
                handleEdit={handleEdit}
                category={cat}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
