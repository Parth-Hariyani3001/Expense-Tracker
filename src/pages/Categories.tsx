import { Search } from "lucide-react";
import React, { useState } from "react";
import FullPage from "../Components/FullPage";
import Spinner from "../Components/Spinner";
import CategoryForm from "../features/categories/CategoryForm";
import CategoryHeader from "../features/categories/CategoryHeader";
import CategoryItem from "../features/categories/CategoryItem";
import { useCategories } from "../features/categories/useCategories";
import type {
  Category,
  ChildCategory,
} from "../features/categories/categoryTypes";
import useOutSideClick from "../hooks/useOutsideClick";
import Modal from "../Components/Modal";

const Categories: React.FC = () => {
  const { categories, isLoading } = useCategories();

  const resetForm = () => {
    setEditingCategory(null);
    setShowEditModal(false);
  };

  const { ref } = useOutSideClick(resetForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    Category | ChildCategory | null
  >(null);

  // Method to get the filteredList
  let filteredList = categories;
  filteredList = categories?.filter((cat) =>
    JSON.stringify(cat).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Method to show the Modal
  const handleShowModal = () => setShowEditModal(true);

  // get parent category
  const parentCategory = filteredList?.map((cat) => ({
    categoryName: cat.categoryName,
    categoryId: cat.id,
    categoryType: cat.categoryType,
  }));

  const handleEdit = (category: Category | ChildCategory) => {
    setEditingCategory(category);
    setShowEditModal(true);
  };

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <CategoryHeader
        handleShowModal={handleShowModal}
        categories={filteredList as Category[]}
      />

      {/* Search and Filters */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
        />
      </div>

      {/* Categories List */}
      <div className="space-y-2 flex flex-col gap-2">
        {filteredList?.map((cat) => (
          <CategoryItem category={cat} handleEdit={handleEdit} key={cat.id} />
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <Modal ref={ref}>
          <CategoryForm
            editingCategory={editingCategory}
            resetForm={resetForm}
            parentCategory={parentCategory}
          />
        </Modal>
      )}
    </div>
  );
};

export default Categories;
