import { useState, useEffect } from "react";

const STORAGE_KEY = 'myAllRecipes'

export function useRecipes() {



    const [recipes, setRecipes] = useState(() => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
    }, [recipes])

    const addRecipe = (recipe) => {
        setRecipes(prev => [...prev, { ...recipe, id: Date.now () }])
    }

    const deleteRecipe = (id) => {
        setRecipes(prev => prev.filter(r => r.id !== id))
    }

    const updateRecipe = (id, updatedData) => {
        setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updatedData} : r))
    }

    const clearAll = () => setRecipes([])
    return { recipes, addRecipe, deleteRecipe, updateRecipe, clearAll}
}