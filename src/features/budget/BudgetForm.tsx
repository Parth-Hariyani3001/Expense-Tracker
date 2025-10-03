import { DollarSign } from "lucide-react";
import type { BudgetEditForm } from "./budgetTypes";
import { Controller, useForm } from "react-hook-form";
import { useParentCategories } from "../categories/useParentCategories";
import { DayPicker } from "react-day-picker";

function BudgetForm({
  editingBudget,
  closeModal,
}: {
  editingBudget: BudgetEditForm | undefined;
  closeModal: () => void;
}) {
  //   const { budgetAmount, dateFrom, dateTo } = editingBudget;
  const { parentCategories } = useParentCategories();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      categorySelector: "",
      amount: editingBudget ? editingBudget.budgetAmount : 0,
      dateFrom: editingBudget ? editingBudget.dateFrom : new Date(),
      dateTo: editingBudget ? editingBudget.dateTo : new Date(),
    },
  });

  function onSubmit() {}

  return (
    <>
      <div className="p-6 border-b dark:bg-gray-800 border-gray-200 transition-colors duration-300 dark:border-gray-600">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingBudget ? "Edit Budget" : "Add New Budget"}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        {!editingBudget && parentCategories && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              {...register("categorySelector")}
              required
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            >
              <option value="">Select a category</option>
              {parentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Budget Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              {...register("amount")}
              type="number"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <Controller
              control={control}
              name="dateFrom"
              render={({ field: { onChange, value } }) => (
                <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      // store in ISO format (yyyy-MM-dd) for Postgres
                      onChange(date.toISOString().split("T")[0]);
                    }
                  }}
                  captionLayout="dropdown"
                  fromYear={2020}
                  toYear={2030}
                />
              )}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <Controller
              control={control}
              name="dateTo"
              render={({ field: { onChange, value } }) => (
                <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      onChange(date.toISOString().split("T")[0]);
                    }
                  }}
                  captionLayout="dropdown"
                  fromYear={2020}
                  toYear={2030}
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={closeModal}
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
    </>
  );
}

export default BudgetForm;
