import type { Category } from "../features/categories/categoryTypes";
import supabase from "./supabase";


export async function getCategoryData() {
    const { data, error } = await supabase.rpc('get_categories_hierarchy');

    if (error)
        throw new Error(error.message);

    return data as Category[];
}