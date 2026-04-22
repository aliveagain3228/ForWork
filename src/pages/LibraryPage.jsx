import { useNavigate } from "react-router-dom";
import { useRecipes} from "../hooks/useRecipes.js";
import ContactFooter from "../components/Footer/ContactFooter.jsx";
import { RiDeleteBin6Line } from "react-icons/ri"
import {useState} from "react";

export default function LibraryPage() {
    const [search, setSearch] = useState('')
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const navigate = useNavigate()
    const { recipes, deleteRecipe, clearAll } = useRecipes()

    const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="library-container">
            <header className="library-header">
                <h1 className="library-title">Калькулятор специй</h1>

                <div className="top-actions">
                    <button onClick={() => navigate('/calculator')} className="btn">
                        Рассчитать
                    </button>
                    <button onClick={() => navigate('/constructor')} className="btn">
                        + Создать новый рецепт
                    </button>
                </div>
            </header>

            <section className="library-content">
                <div className="stats-info">
                    Всего рецептов: <span>{recipes.length}</span>
                </div>

                <div className="search-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Поиск рецепта..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="search-clear" onClick={() => setSearch('')}>X</button>
                    )}
                </div>

                {recipes.length === 0 ? (
                    <div className="empty-state">
                        <p>У вас пока нет рецептов, нажмите кнопку выше чтобы создать :)</p>
                    </div>

                ) : (
                    <div className="recipe-grid">
                        {filtered.length === 0 ? (
                            <p className="empty-state">Ничего не найдено по запросу "{search}"</p>
                        ) : filtered.map(recipe => (
                        <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/constructor/${recipe.id}`)}>
                                <div className="recipe-info">
                                    <span className="recipe-name">{recipe.name}</span>
                                </div>

                                <div className="recipe-actions">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setConfirmDeleteId(recipe.id)
                                        }}
                                        className="btn-icon-delete"
                                        title="Удалить"
                                    >
                                        <RiDeleteBin6Line />
                                    </button>

                                    <button
                                        onClick={() => navigate(`/constructor/${recipe.id}`)}
                                        className="btn-card"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>




            {recipes.length > 0 && (
                <footer className="library-footer">
                    <button
                        onClick={clearAll} className="btn-clear "
                    >
                        Очистить всё
                    </button>
                </footer>


            )}
            {confirmDeleteId && (
                <div className="confirm-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <p>Удалить этот рецепт?</p>
                        <div className="confirm-actions">
                            <button
                                className="btn"
                                onClick={() => {
                                    deleteRecipe(confirmDeleteId)
                                    setConfirmDeleteId(null)
                                }}
                            >
                                Удалить
                            </button>
                            <button
                                className="btn-clear"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ContactFooter />
        </div>
    )
}