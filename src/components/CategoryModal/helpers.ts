import { CategoriesEnum } from "@constants/index";

export const generateCategories = () => {
    const categories = Object.values(CategoriesEnum);
    return categories.map(category => {
        return {
            value: category,
            label: category
        }
    })
}