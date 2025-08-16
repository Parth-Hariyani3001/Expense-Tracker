import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  FolderPlus,
  Tag,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  parentId: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Food & Dining",
      description: "All food related expenses",
      color: "#ef4444",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Restaurants",
      description: "Dining out expenses",
      color: "#f97316",
      parentId: "1",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Groceries",
      description: "Grocery shopping",
      color: "#22c55e",
      parentId: "1",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Transportation",
      description: "Travel and transport expenses",
      color: "#3b82f6",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "5",
      name: "Gas",
      description: "Fuel expenses",
      color: "#8b5cf6",
      parentId: "4",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "6",
      name: "Public Transport",
      description: "Bus, train, metro expenses",
      color: "#06b6d4",
      parentId: "4",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "7",
      name: "Entertainment",
      description: "Fun and leisure activities",
      color: "#ec4899",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["1", "4"])
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    color: "#3b82f6",
    parentId: "",
  });

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

  const getParentCategories = () => categories.filter((cat) => !cat.parentId);
  const getChildCategories = (parentId: string) =>
    categories.filter((cat) => cat.parentId === parentId);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

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

  const renderCategoryItem = (category: Category, level: number = 0) => {
    const hasChildren = getChildCategories(category.id).length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const children = getChildCategories(category.id);

    return (
      <div
        key={category.id}
        className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300 hover:shadow-md"
      >
        <div
          className={`flex items-center justify-between p-5 hover:bg-gray-50 transition-all duration-200 ${
            level > 0 ? "ml-6 border-l-4 bg-gray-50/50" : ""
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
            className={`bg-gradient-to-r from-gray-50 to-gray-100/50 transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {children.map((child) => renderCategoryItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage your expense categories and subcategories.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderPlus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {getParentCategories().length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mt-4">
            Parent Categories
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {categories.filter((cat) => cat.parentId).length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mt-4">
            Subcategories
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MoreVertical className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {categories.length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mt-4">
            Total Categories
          </h3>
        </div>
      </div>

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
      <div className="space-y-2">
        {searchTerm
          ? // Show filtered results
            filteredCategories.map((category) => renderCategoryItem(category))
          : // Show hierarchical structure
            getParentCategories().map((category) =>
              renderCategoryItem(category)
            )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={resetForm}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
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
                  {getParentCategories()
                    .filter(
                      (cat) => !editingCategory || cat.id !== editingCategory.id
                    )
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
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
