import React, { useState } from "react";
import {
  Search,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useBudget } from "../features/budget/useBudget";
import BudgetHeader from "../features/budget/BudgetHeader";
import BudgetItem from "../features/budget/BudgetItem";

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

const PERIOD_TYPES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
  { value: "custom", label: "Custom Period" },
];

export default function Budget() {
  const { budgetSummary, isLoading } = useBudget();

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      user_id: "user1",
      category_id: "2",
      amount: 500.0,
      period_start: "2024-01-01",
      period_end: "2024-01-31",
      created_at: "2024-01-01T00:00:00Z",
      category: {
        id: "2",
        name: "Food & Dining",
        color: "bg-red-500",
        type: "expense",
      },
      spent: 456.78,
      remaining: 43.22,
      progress: 91,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    category_id: "",
    amount: "",
    period_start: "",
    period_end: "",
    period_type: "monthly",
  });

  // Mock categories data
  const categories = [
    { id: "2", name: "Food & Dining", color: "bg-red-500", type: "expense" },
    { id: "3", name: "Transportation", color: "bg-blue-500", type: "expense" },
    { id: "4", name: "Entertainment", color: "bg-purple-500", type: "expense" },
    { id: "5", name: "Shopping", color: "bg-green-500", type: "expense" },
    { id: "6", name: "Utilities", color: "bg-yellow-500", type: "expense" },
  ];

  const filteredBudgets = budgetSummary?.filter((budget) =>
    budget.parent_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBudget = () => {
    setEditingBudget(null);
    setFormData({
      category_id: "",
      amount: "",
      period_start: "",
      period_end: "",
      period_type: "monthly",
    });
    setShowModal(true);
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      category_id: budget.category_id,
      amount: budget.amount.toString(),
      period_start: budget.period_start,
      period_end: budget.period_end,
      period_type: "custom",
    });
    setShowModal(true);
  };

  const handleDeleteBudget = (budgetId: string) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId));
    }
  };

  const handlePeriodTypeChange = (periodType: string) => {
    setFormData((prev) => ({ ...prev, period_type: periodType }));

    if (periodType !== "custom") {
      const today = new Date();
      let startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      if (periodType === "quarterly") {
        const quarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), quarter * 3, 1);
        endDate = new Date(today.getFullYear(), quarter * 3 + 3, 0);
      } else if (periodType === "yearly") {
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
      }

      setFormData((prev) => ({
        ...prev,
        period_start: startDate.toISOString().split("T")[0],
        period_end: endDate.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.id === formData.category_id
    );

    if (editingBudget) {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.id === editingBudget.id
            ? {
                ...budget,
                category_id: formData.category_id,
                amount: parseFloat(formData.amount),
                period_start: formData.period_start,
                period_end: formData.period_end,
                category: selectedCategory,
              }
            : budget
        )
      );
    } else {
      const newBudget: Budget = {
        id: Date.now().toString(),
        user_id: "user1",
        category_id: formData.category_id,
        amount: parseFloat(formData.amount),
        period_start: formData.period_start,
        period_end: formData.period_end,
        created_at: new Date().toISOString(),
        category: selectedCategory,
        spent: 0,
        remaining: parseFloat(formData.amount),
        progress: 0,
      };
      setBudgets((prev) => [...prev, newBudget]);
    }

    setShowModal(false);
  };

  const getBudgetStatus = (progress: number) => {
    if (progress >= 100)
      return {
        color: "text-red-600",
        icon: AlertTriangle,
        label: "Over Budget",
      };
    if (progress >= 80)
      return { color: "text-yellow-600", icon: Clock, label: "Near Limit" };
    return { color: "text-green-600", icon: CheckCircle, label: "On Track" };
  };

  // TODO
  if (!filteredBudgets) {
    return <div>None found</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <BudgetHeader budget={filteredBudgets} />

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
          return <BudgetItem key={budget.parent_category_id} budget={budget} />;
        })}
      </div>

      {/* AI Code */}
      {/* <div className="space-y-4">
        {filteredBudgets.map((budget) => {
          const status = getBudgetStatus(budget.progress || 0);
          const StatusIcon = status.icon;

          return (
            <div
              key={budget.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 ${budget.category?.color} rounded-full`}
                  ></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {budget.category?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {budget.period_start} to {budget.period_end}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center space-x-1 ${status.color}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                  <button
                    onClick={() => handleEditBudget(budget)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Budget Amount
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${budget.amount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Spent
                  </span>
                  <span className="font-semibold text-red-600">
                    ${(budget.spent || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Remaining
                  </span>
                  <span
                    className={`font-semibold ${
                      (budget.remaining || 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${(budget.remaining || 0).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {budget.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        (budget.progress || 0) >= 100
                          ? "bg-red-500"
                          : (budget.progress || 0) >= 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(budget.progress || 0, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingBudget ? "Edit Budget" : "Add New Budget"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Period Type
                </label>
                <select
                  value={formData.period_type}
                  onChange={(e) => handlePeriodTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {PERIOD_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.period_start}
                    onChange={(e) =>
                      setFormData({ ...formData, period_start: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.period_end}
                    onChange={(e) =>
                      setFormData({ ...formData, period_end: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                >
                  {editingBudget ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
