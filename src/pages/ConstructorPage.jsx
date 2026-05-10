import { useForm } from 'react-hook-form'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes"
import ContactFooter from "../components/Footer/ContactFooter.jsx";
import {useTranslation} from "../context/LocaleContext.jsx";

export default function ConstructorPage() {

    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm()

    const navigate = useNavigate()
    const { id } = useParams()
    const { recipes, addRecipe, updateRecipe } = useRecipes()

    const [editingIngId, setEditingIngId] = useState(null)
    const isEditMode = Boolean(id)
    const recipeToEdit = isEditMode
        ? recipes.find(r => r.id === Number(id))
        : null

    const [title, setTitle] = useState(recipeToEdit?.name ?? '')
    const [ingredients, setIngredients] = useState(recipeToEdit?.list ?? [])
    const [titleError, setTitleError] = useState(false)


    const handleEditIngredient = (ing) => {
        setEditingIngId(ing.id)
        setValue('ingName',ing.name)
        setValue('ingAmount', String(ing.amount))
        setValue('ingUnit', ing.unit)
    }

    const onAddIngredient = (data) => {
        if (editingIngId !== null) {
            setIngredients(prev => prev.map(i =>
                i.id === editingIngId
                ? { ...i, name: data.ingName, amount: Number(data.ingAmount.replace(',', '.')), unit: data.ingUnit }
                    : i
            ))
            setEditingIngId(null)
        } else {
            const newIng = {
                id: Date.now(),
                name: data.ingName,
                amount: Number(data.ingAmount.replace(',', '.')),
                unit: data.ingUnit
            }
            setIngredients(prev => [...prev, newIng])
        }
        reset()
    }

    const handleDeleteIngredient = (ingId) => {
        setIngredients(prev => prev.filter(i => i.id !== ingId))
    }

    const handleSave = () => {

        if (!title) {
            setTitleError(true)
            return;
        }
        setTitleError(false)

        if (isEditMode) {
            updateRecipe(Number(id), { name: title, list: ingredients })
        } else {
            addRecipe({ name: title, list: ingredients })
        }

        navigate('/')
    }

    return (
        <div className="calculator-container">
            <button className="btn" onClick={() => navigate('/')}>{t('constructor.back')}</button>
            <h1>{isEditMode ? t('constructor.editRecipe') : t('constructor.newRecipe')}</h1>

            <label>
                <input
                    className={`calculator-title-input ${titleError ? 'input--error' : ''}`}
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        if (e.target.value) setTitleError(false)
                    }}
                    placeholder={t('constructor.recipeNamePlaceholder')}
                />
            </label>

            <fieldset>
                <legend>{t('constructor.newIngredient')}</legend>
                <input
                    {...register('ingName', {required: t('constructor.nameRequired')})}
                    className={errors.ingName ? 'input--error' : ''}
                    placeholder={t('constructor.whatToAdd')}
                    />
                {errors.ingName && <span className="field-error">{errors.ingName.message}</span>}
                <input
                    {...register('ingAmount', {
                        required: t('constructor.amountRequired'),
                        validate: (val) => /^\d*\.?\d*$/.test(val.replace(',', '.')) || 'Только цифры!'
                    })}
                    className={errors.ingAmount ? 'input--error' : ''}
                    inputMode="decimal"
                    placeholder={t('constructor.howMuch')}
                />
                {errors.ingAmount && <span className="field-error">{errors.ingAmount.message}</span>}
                <select {...register('ingUnit')}>
                <option value="г">г</option>
                <option value="кг">кг</option>
                <option value="мл">мл</option>
                <option value="л">л</option>
                <option value="ч.л">ч.л</option>
                <option value="ст.л">ст.л</option>
                </select>
                <button className="add-btn" onClick={handleSubmit(onAddIngredient)}>
                    {editingIngId !== null ? t('constructor.saveChange') : t('constructor.add')}
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
                                {t('constructor.changeIng')}
                            </button>
                            <button
                            onClick={() => handleDeleteIngredient(ing.id)}
                            >
                                {t('constructor.deleteIng')}
                            </button>
                        </div>

                    </li>
                ))}
            </ul>

            <button className="btn" onClick={handleSave}>{t('constructor.save')}</button>

            <ContactFooter />
        </div>
    )
}
