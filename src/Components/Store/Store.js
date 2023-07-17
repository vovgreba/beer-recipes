import { create } from "zustand";
import { devtools } from 'zustand/middleware'


import {requestData} from '../../Api/Api'

const useBeerStore = create(devtools((set, get) => ({
  recipesBeer: [],
  recipesBeerLength: 0,
  selectedRecipeIdToDelete: [],
  showButtonIdToDelete: false,
  recipesBeerLengthCorrent: null,
  selectedRecipe: null,
  edditRecipes: async (id) => {

    const data = await requestData(id);

    set((state) => ({
      recipesBeer: [...state.recipesBeer, ...data],
      recipesBeerLength: state.recipesBeerLength + data.length
    }));
    return data
  },
  setSelectedRecipe: (recipe) => {
 
    set( {selectedRecipe: [recipe]} )
  },

  handleContextMenu: ( id) => {
    
    set((state) => ({
      selectedRecipeIdToDelete: [...state.selectedRecipeIdToDelete, id],
      showButtonIdToDelete: true
    }))
    
   
  },

  removeRecipeById: (id) => {
    
    const selectedId = get().selectedRecipeIdToDelete;
    const currentRecipes = get().recipesBeer;
    const updatedRecipes = currentRecipes.filter(recipe => !selectedId.includes(recipe.id));
    set({ recipesBeer: updatedRecipes, showButtonIdToDelete: false });
    
  }
})))


export default useBeerStore