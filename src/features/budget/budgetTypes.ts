import type { Tables } from "../../types/database.types";

export type BudgetSummary = Tables<"budget_summary">
export type BudgetBreakdown = Tables<"budget_breakdown">

export type BudgetBreakdownList = {
    id: number,
    color: string | undefined,
    categoryName: string | undefined,
    amount: number,
}