export interface Categories {
    id: number,
    parent_category_name: string,
    color: string,
    description: string | null,
    created_at: string,
    child_categories: {
        id: number,
        color: string,
        description: string | null,
        created_at: string,
        parent_id: number,
        child_category_name: string
    }[],
}