import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes"
import ContactFooter from "../components/Footer/ContactFooter.jsx";

export default function ConstructorPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [editingIngId, setEditingIngId] = useState(null)

    const handleEditIngredient = (ing) => {
        setEditingIngId(ing.id)
        setIngName(ing.name)
        setIngAmount(ing.amount)
        setIngUnit(ing.unit)
    }

    const { recipes, addRecipe, updateRecipe } = useRecipes()

    const isEditMode = Boolean(id)

    const recipeToEdit = isEditMode
        ? recipes.find(r => r.id === Number(id))
        : null

    const [title, setTitle] = useState(recipeToEdit?.name ?? '')
    const [ingredients, setIngredients] = useState(recipeToEdit?.list ?? [])

    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')
    const [ingUnit, setIngUnit] = useState('')

    const handleAddIngredient = () => {
        if (!ingName || !ingAmount) return

        if (editingIngId !== null) {
            setIngredients(prev => prev.map(i =>
                i.id === editingIngId
                    ? { ...i, name: ingName, amount: Number(ingAmount), unit: ingUnit }
                    : i
            ))
            setEditingIngId(null)
        } else {
            const newIng = { id: Date.now(), name: ingName, amount: Number(ingAmount), unit: ingUnit }
            setIngredients(prev => [...prev, newIng])
        }

        setIngName('')
        setIngAmount('')
        setIngUnit('')
    }

    const handleDeleteIngredient = (ingId) => {
        setIngredients(prev => prev.filter(i => i.id !== ingId))
    }

    const handleSave = () => {
        if (!title) return

        if (isEditMode) {
            updateRecipe(Number(id), { name: title, list: ingredients })
        } else {
            addRecipe({ name: title, list: ingredients })
        }

        navigate('/')
    }

    return (
        <div className="calculator-container">
            <button className="btn" onClick={() => navigate('/')}>Назад</button>
            <h1>{isEditMode ? 'Редактировать рецепт' : 'Новый рецепт'}</h1>

            <label>
                <input
                    className="calculator-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название рецепта"
                />
            </label>

            <fieldset>
                <legend>Новый ингридиент</legend>
                <input value={ingName} onChange={(e) => setIngName(e.target.value)} placeholder="Что добавляем?" />
                <input
                    value={ingAmount}
                    onChange={(e) => setIngAmount(e.target.value)}
                    type="number"
                    step={0.01}
                    min={0}
                    placeholder="Сколько" />
                <select value={ingUnit} onChange={(e) => setIngUnit(e.target.value)}>
                <option value="г">г</option>
                <option value="кг">кг</option>
                <option value="мл">мл</option>
                <option value="л">л</option>
                <option value="ч.л">ч.л</option>
                <option value="ст.л">ст.л</option>
                </select>
                <button className="add-btn" onClick={handleAddIngredient}>
                    {editingIngId !== null ? "Сохранить изменение" : "Добавить"}
                </button>
        </fieldset>

            <ul className="ing-list">
                {ingredients.map(ing => (
                    <li key={ing.id}>
                        <span>{ing.name}: {ing.amount} {ing.unit}</span>
                        <div className="ing-actions">
                            <button
                                className="btn-card"
                                onClick={() => handleEditIngredient(ing)}>
                                Изменить
                            </button>
                            <button
                            onClick={() => handleDeleteIngredient(ing.id)}
                            >
                                Удалить
                            </button>
                        </div>

                    </li>
                ))}
            </ul>

            <button className="btn" onClick={handleSave}>Сохранить рецепт</button>

            <ContactFooter />
        </div>
    )
}
