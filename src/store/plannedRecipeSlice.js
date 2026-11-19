export const createPlannedRecipeSlice = (set) => ({
    plannedRecipes: [],
    addPlannedRecipe: (plannedRecipe) => set((state) => ({
        plannedRecipes: [...state.plannedRecipes, plannedRecipe],
        shoppingLists: [
            ...state.shoppingLists,
            ...plannedRecipe.ingredients.map((ingredient) => ({
                ...ingredient,
                id: crypto.randomUUID(),
                plannedRecipeId: plannedRecipe.id,
                recipeId: plannedRecipe.recipeId,
                recipeName: plannedRecipe.name,
                date: plannedRecipe.date,
            })),
        ],
    })),
    removePlannedRecipe: (id) => set((state) => ({
        plannedRecipes: state.plannedRecipes.filter((plannedRecipe) => plannedRecipe.id !== id),
        shoppingLists: state.shoppingLists.filter((ingredient) => ingredient.plannedRecipeId !== id),
    })),
    updatePlannedRecipe: (id, updates) => set((state) => ({
        plannedRecipes: state.plannedRecipes.map((plannedRecipe) =>
            plannedRecipe.id === id
                ? { ...plannedRecipe, ...updates }
                : plannedRecipe
        ),
        shoppingLists: updates.date !== undefined
            ? state.shoppingLists.map((ingredient) =>
                ingredient.plannedRecipeId === id
                    ? { ...ingredient, date: updates.date }
                    : ingredient
            )
            : state.shoppingLists,
    })),
})

export const selectPlannedRecipes = (state) => state.plannedRecipes
export const selectAddPlannedRecipe = (state) => state.addPlannedRecipe
export const selectRemovePlannedRecipe = (state) => state.removePlannedRecipe
export const selectUpdatePlannedRecipe = (state) => state.updatePlannedRecipe
