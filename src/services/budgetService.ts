import type { BudgetBreakdown, BudgetSummary } from "../features/budget/budgetTypes";
import supabase from "./supabase";

export async function getBudgetSummary() {
    const { data, error } = await supabase
        .from('budget_summary')
        .select('*')

    if (error)
        throw new Error('Could not fetch Budget Summary')

    return data as BudgetSummary[];
}

export async function getBudgetBreakdown({ categoryId, dateFrom, dateTo }: { categoryId: number, dateFrom: string, dateTo: string }) {
    const { data, error } = await supabase
        .from('budget_breakdown')
        .select('category_name, color, id, sum')
        .eq('parent_id', categoryId)
        .gte('transaction_date', dateFrom)
        .lte('transaction_date', dateTo)

    if (error)
        throw new Error('Could not fetch budget breakdown')

    return data as BudgetBreakdown[];
}