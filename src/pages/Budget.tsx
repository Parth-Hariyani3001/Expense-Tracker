import { useState } from "react";
import { Search } from "lucide-react";
import { useBudget } from "../features/budget/useBudget";
import BudgetHeader from "../features/budget/BudgetHeader";
import BudgetItem from "../features/budget/BudgetItem";
import FullPage from "../Components/FullPage";
import Spinner from "../Components/Spinner";
import Modal from "../Components/Modal";
import useOutSideClick from "../hooks/useOutsideClick";
import type { BudgetEditForm } from "../features/budget/budgetTypes";
import BudgetForm from "../features/budget/BudgetForm";

interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  period_start: string;
  period_end: string;
  created_at: string;
  category?: {
    id: string;
    name: string;
    color: string;
    type: "income" | "expense" | "debt" | "investment";
  };
  spent?: number;
  remaining?: number;
  progress?: number;
}

export default function Budget() {
  const { ref } = useOutSideClick(closeModal);
  const { budgetSummary, isLoading } = useBudget();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBudget, setEditingBudget] = useState<
    BudgetEditForm | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);

  const filteredBudgets = budgetSummary?.filter((budget) =>
    budget.parent_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function handleEdit(budget: BudgetEditForm) {
    setEditingBudget(budget);
    setShowModal(true);
  }

  // TODO
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (!filteredBudgets) {
    return <div>No data</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <BudgetHeader budget={filteredBudgets} openModal={openModal} />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search budgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
        />
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {filteredBudgets.map((budget) => {
          return (
            <BudgetItem
              handleEdit={handleEdit}
              key={budget.parent_category_id}
              budget={budget}
            />
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal ref={ref}>
          <BudgetForm editingBudget={editingBudget} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
