import { useState } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import {useNavigate} from "react-router-dom";
import ContactFooter from "../components/Footer/ContactFooter.jsx";
import {useTranslation} from "../context/LocaleContext.jsx";

export default function CalculatorPage() {
    const { recipes } = useRecipes()
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [selectedId, setSelectedId] = useState(recipes[0]?.id || null)
    const selectedRecipe = recipes.find(r => r.id === selectedId);
    const [weight, setWeight] = useState(1)

    const handleSelectChange = (e) => {
        setSelectedId(Number(e.target.value))
    }

    return (
        <div className="calculator-container">
            <button className="btn" onClick={() => navigate('/')}>{t('calculator.back')}</button>
            <h1>{t('calculator.title')}</h1>

            {recipes.length === 0 ? (
                <p>{t('calculator.notFound')}</p>
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
                        {t('calculator.coefficient')}
                        <input
                            className="calculator-title-input"
                            type="text"
                            inputMode="decimal"
                            step="0.01"
                            min={0}
                            value={weight}
                            onChange={(e) => {
                                const val = e.target.value.replace(',', '.')

                                if ( val === '' || val === '.' || /^\d*\.?\d*$/.test(val)) {
                                    setWeight(val)
                                }
                            }}
                        />
                    </label>

                    <h3>{t('calculator.result')}: {weight}</h3>
                    <ul className="ing-list">
                        {selectedRecipe?.list.map((ing, index) => (
                            <li key={index}>
                                <strong>{ing.name}:</strong> {(ing.amount * (parseFloat(weight) || 0)).toFixed(1)} {ing.unit}
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