import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { colors } from "../data/colourList";
import useOutSideClick from "../hooks/useOutsideClick";
import { useCategories } from "../features/categories/useCategories";
import CategoryHeader from "../features/categories/CategoryHeader";
import FullPage from "../Components/FullPage";
import Spinner from "../Components/Spinner";
import CategoryItem from "../features/categories/CategoryItem";
import type {
  Category,
  ChildCategory,
} from "../features/categories/categoryTypes";
import CategoryForm from "./CategoryForm";

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  parentId: string;
}

const Categories: React.FC = () => {
  const { categories, isLoading } = useCategories();

  const resetForm = () => {
    setEditingCategory(null);
    setShowModal(false);
  };

  const { ref } = useOutSideClick(resetForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    Category | ChildCategory | null
  >(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    color: "#3b82f6",
    parentId: "",
  });

  // Method to get the filteredList
  let filteredList = categories;
  filteredList = categories?.filter((cat) =>
    JSON.stringify(cat).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Method to show the Modal
  const handleShowModal = () => setShowModal(true);

  // get parent category
  const parentCategory = filteredList?.map((cat) => ({
    categoryName: cat.categoryName,
    categoryId: cat.id,
  }));

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

  const handleEdit = (category: Category | ChildCategory) => {
    setEditingCategory(category);
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
        categories={filteredList as Category[]}
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
        {filteredList?.map((cat) => (
          <CategoryItem category={cat} handleEdit={handleEdit} key={cat.id} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            ref={ref}
          >
            <CategoryForm
              editingCategory={editingCategory}
              resetForm={resetForm}
              parentCategory={parentCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
