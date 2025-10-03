import type { Tables } from "../../types/database.types";

export type BudgetSummary = Tables<"budget_summary">
export type BudgetBreakdown = Tables<"budget_breakdown">

export type BudgetEditForm = {
    budgetAmount: number,
    dateFrom: Date,
    dateTo: Date
}

export type ParentCategory = {
    id: number,
    category_name: string
}

export type BudgetBreakdownList = {
    id: number,
    color: string | undefined,
    categoryName: string | undefined,
    amount: number,
}
