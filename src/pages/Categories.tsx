import React, { useState } from "react";
import { Edit2, Trash2, ChevronRight, Search, Filter, Tag } from "lucide-react";
import useOutSideClick from "../hooks/useOutsideClick";
import { useCategories } from "../features/categories/useCategories";
import CategoryHeader from "../features/categories/CategoryHeader";
import FullPage from "../Components/FullPage";
import Spinner from "../Components/Spinner";
import type { Category } from "../features/categories/categoryTypes";
import CategoryItem from "../features/categories/CategoryItem";

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  parentId: string;
}

const Categories: React.FC = () => {
  const { categories, isLoading } = useCategories();

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "#3b82f6",
      parentId: "",
    });
    setEditingCategory(null);
    setShowModal(false);
  };

  const { ref } = useOutSideClick(resetForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    color: "#3b82f6",
    parentId: "",
  });

  // Method to show the Modal
  const handleShowModal = () => setShowModal(true);

  // To get the parent category
  // const getParentCategories = () =>
  //   categoryData.reduce((cat, acc) => cat.category_name, []);

  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#c084fc",
    "#ec4899",
    "#f43f5e",
    "#64748b",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : cat
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        parentId: formData.parentId || undefined,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    resetForm();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color,
      parentId: category.parentId || "",
    });
    setShowModal(true);
  };

  const handleDelete = (categoryId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This will also delete all subcategories."
      )
    ) {
      // Delete category and all its children
      setCategories((prev) =>
        prev.filter(
          (cat) => cat.id !== categoryId && cat.parentId !== categoryId
        )
      );
    }
  };

  const renderCategoryItem = (category: Category, level: number = 0) => {
    const hasChildren = getChildCategories(category.id).length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const children = getChildCategories(category.id);

    return (
      <div
        key={category.id}
        className={`${
          level === 0
            ? "bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300 hover:shadow-md"
            : ""
        }`}
      >
        <div
          className={`flex items-center justify-between p-5 hover:bg-gray-50 transition-all duration-200 ${
            level > 0
              ? "ml-8 border-l-4 bg-gray-50/50 rounded-r-lg mb-2"
              : hasChildren && isExpanded
              ? "rounded-t-xl"
              : "rounded-xl"
          }`}
          style={level > 0 ? { borderLeftColor: category.color } : {}}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren && (
              <button
                onClick={() => toggleExpanded(category.id)}
                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 group"
              >
                <div
                  className={`transform transition-transform duration-300 ${
                    isExpanded ? "rotate-90" : "rotate-0"
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
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {category.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  Created: {category.createdAt}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  Updated: {category.updatedAt}
                </span>
                {category.parentId && (
                  <span className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    Subcategory
                  </span>
                )}
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
            <button
              onClick={() => handleDelete(category.id)}
              className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <Trash2 className="w-4 h-4 transition-transform hover:scale-110" />
            </button>
          </div>
        </div>

        {hasChildren && (
          <div
            className={`bg-gradient-to-r from-gray-50 to-gray-100/50 transition-all duration-500 ease-in-out overflow-hidden rounded-b-xl ${
              isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {children.map((child) => renderCategoryItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <CategoryHeader
        handleShowModal={handleShowModal}
        categories={categories as Category[]}
      />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-2 flex flex-col gap-2">
        {/* {searchTerm
          ? // Show filtered results
            filteredCategories.map((category) => renderCategoryItem(category))
          : // Show hierarchical structure
            getParentCategories().map((category) =>
              renderCategoryItem(category)
            )} */}

        {searchTerm ? (
          <div>Hello World</div>
        ) : (
          categories?.map((cat) => <CategoryItem category={cat} key={cat.id} />)
        )}
      </div>

      {/* ref */}
      {/* onClick={resetForm} */}
      {/* onClick={(e) => e.stopPropagation()} */}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            ref={ref}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter description (optional)"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None (Parent Category)</option>
                  {/* {getParentCategories()
                    .filter(
                      (cat) => !editingCategory || cat.id !== editingCategory.id
                    )
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))} */}
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
                        setFormData((prev) => ({ ...prev, color }))
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
