import type { ParentCategory } from "../features/budget/budgetTypes";
import type {
    Category,
    CategoryCreate,
} from "../features/categories/categoryTypes";
import supabase from "./supabase";

export async function getCategoryData() {
    const { data, error } = await supabase.rpc("get_categories_hierarchy");

    if (error) throw new Error(error.message);

    return data as Category[];
}

export async function getParentCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select("category_name, id")
        .is('parent_id', null)

    if (error)
        throw new Error(error.message)

    return data as ParentCategory[]
}

export async function createCategory({
    categoryBody,
}: {
    categoryBody: CategoryCreate;
}) {
    const { error } = await supabase
        .from("categories")
        .insert([{ ...categoryBody }]);

    if (error) throw new Error(error.message);
}

export async function editCategories({
    categoryBody,
    id,
}: {
    categoryBody: CategoryCreate;
    id: number;
}) {
    const { error } = await supabase
        .from("categories")
        .update({ ...categoryBody })
        .eq("id", id);

    if (error) throw new Error(error.message);
}

export async function deleteCategory(categoryId: number) {
    console.log(categoryId)

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

    if (error)
        throw new Error(error.message)
}
