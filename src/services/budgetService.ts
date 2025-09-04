import type { BudgetSummary } from "../features/budget/budgetTypes";
import supabase from "./supabase";

export async function getBudgetSummary({ userId }: { userId: string }) {
    const { data, error } = await supabase
        .from('budget_summary')
        .select('*')
        .eq('user_id', userId);

    if (error)
        throw new Error('Could not fetch Budget Summary')

    return data as BudgetSummary[];
}