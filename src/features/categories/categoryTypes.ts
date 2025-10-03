import type { Database, Tables, TablesInsert } from "../../types/database.types";

export type ChildCategory = {
    id: number;
    color: string;
    description: string | null;
    createdAt: string;
    parentId: number;
    categoryName: string;
};

export type Category = {
    id: number,
    categoryName: string,
    color: string,
    description: string | null,
    createdAt: string,
    categoryType: CategoryType,
    childCategories: ChildCategory[],
}

export type CategoryCreate = TablesInsert<"categories">
export type CategoryType = Database["public"]["Enums"]["category_type"]
export type Categories = Tables<"categories">