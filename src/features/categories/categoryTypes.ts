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
    childCategories: ChildCategory[],
}