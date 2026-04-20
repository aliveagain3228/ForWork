import { useState, useEffect } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import {useNavigate} from "react-router-dom";
import ContactFooter from "../components/Footer/ContactFooter.jsx";

export default function CalculatorPage() {
    const { recipes } = useRecipes()

    const navigate = useNavigate()

    const [selectedId, setSelectedId] = useState(recipes[0]?.id || null)
    const selectedRecipe = recipes.find(r => r.id === selectedId);
    const [weight, setWeight] = useState(1)

    const handleSelectChange = (e) => {
        setSelectedId(Number(e.target.value))
    }

    return (
        <div className="calculator-container">
            <button className="btn" onClick={() => navigate('/')}>Назад</button>
            <h1>Калькулятор</h1>

            {recipes.length === 0 ? (
                <p>Рецепты не найдены</p>
            ) : (
                <>
                    <select className="calculator-title-input" onChange={handleSelectChange}>
                        {recipes.map(recipe => (
                            <option key={recipe.id} value={recipe.id}>
                                {recipe.name}
                            </option>
                        ))}
                    </select>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        Коэффициент (500г = 0.5)
                        <input
                            className="calculator-title-input"
                            type="number"
                            step="0.01"
                            min={0}
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                        />
                    </label>

                    <h3>Результат для коэффициента: {weight}</h3>
                    <ul className="ing-list">
                        {selectedRecipe?.list.map((ing, index) => (
                            <li key={index}>
                                <strong>{ing.name}:</strong> {(ing.amount * weight).toFixed(1)} {ing.unit}
                            </li>
                        ))}
                    </ul>
                </>
            )
            }

            <ContactFooter />
        </div>
    )
}