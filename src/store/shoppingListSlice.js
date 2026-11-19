
export const createShoppingListSlice = (set) => ({
    shoppingLists: [],
    addShoppingList: (plannedRecipe) => set((state) => ({
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
    removeShoppingList: (id) => set((state) => ({
        shoppingLists: state.shoppingLists.filter((shoppingLists) => shoppingLists.id !== id)
    })),
    updateShoppingList: (id, updates) => set((state) => ({
        shoppingLists: state.shoppingLists.map((shoppingList) =>
            shoppingList.id === id
                ? { ...shoppingList, ...updates }
                : shoppingList
        )
    })),
})

export const selectShoppingList = (state) => state.shoppingLists
export const selectAddShoppingList = (state) => state.addShoppingList
export const selectRemoveShoppingList = (state) => state.removeShoppingList
export const selectUpdateShoppingList = (state) => state.updateShoppingList
