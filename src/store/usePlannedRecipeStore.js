import { create } from "zustand";
import { devtools,persist } from "zustand/middleware";
import { createShoppingListSlice } from "./shoppingListSlice";
import { createPlannedRecipeSlice } from "./plannedRecipeSlice";

export const usePlannedRecipeStore = create(
    devtools(
        persist(
            (set) => ({
                ...createShoppingListSlice(set),
                ...createPlannedRecipeSlice(set),
            }),
            { name: "planned-recipes" }
        )
    )
);

