import type { DateRange } from "react-day-picker";
import type { BudgetBreakdown, BudgetSummary } from "../features/budget/budgetTypes";
import supabase from "./supabase";
import { format } from "date-fns";

export async function getBudgetSummary(range: DateRange) {
    const date_from = format(range.from as Date, 'yyyy-MM-dd')
    const date_to = format(range.to as Date, 'yyyy-MM-dd')

    console.log(date_from, date_to)

    const { data, error } = await supabase
        .from('budget_summary')
        .select('*')
        .gte('budget_period_from', date_from)
        .lte('budget_period_end', date_to)

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