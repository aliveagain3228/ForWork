import { useNavigate } from "react-router-dom";
import { useRecipes} from "../hooks/useRecipes.js";
import ContactFooter from "../components/Footer/ContactFooter.jsx";
import { RiDeleteBin6Line } from "react-icons/ri"
import {useState} from "react";
import {useTranslation} from "../context/LocaleContext.jsx";

export default function LibraryPage() {
    const [search, setSearch] = useState('')
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const navigate = useNavigate()
    const { recipes, deleteRecipe, clearAll } = useRecipes()

    const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    const { t } = useTranslation()

    return (
        <div className="library-container">
            <header className="library-header">
                <h1 className="library-title">{t('library.title')}</h1>

                <div className="top-actions">
                    <button onClick={() => navigate('/calculator')} className="btn">
                        {t('library.calculate')}
                    </button>
                    <button onClick={() => navigate('/constructor')} className="btn">
                        {t('library.createRecipe')}
                    </button>
                </div>
            </header>

            <section className="library-content">
                <div className="stats-info">
                    {t('library.totalRecipes')}: <span>{recipes.length}</span>
                </div>

                <div className="search-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('library.searchPlaceholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="search-clear" onClick={() => setSearch('')}>X</button>
                    )}
                </div>

                {recipes.length === 0 ? (
                    <div className="empty-state">
                        <p>{t('library.noRecipes')}</p>
                    </div>

                ) : (
                    <div className="recipe-grid">
                        {filtered.length === 0 ? (
                            <p className="empty-state">{t('library.notFound')} "{search}"</p>
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
                                        title={t('library.delete')}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>

                                    <button
                                        onClick={() => navigate(`/constructor/${recipe.id}`)}
                                        className="btn-card"
                                    >
                                        {t('library.edit')}
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
                        {t('library.clearAll')}
                    </button>
                </footer>


            )}
            {confirmDeleteId && (
                <div className="confirm-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <p>{t('library.confirmDelete')}</p>
                        <div className="confirm-actions">
                            <button
                                className="btn"
                                onClick={() => {
                                    deleteRecipe(confirmDeleteId)
                                    setConfirmDeleteId(null)
                                }}
                            >
                                {t('library.delete')}
                            </button>
                            <button
                                className="btn-clear"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                {t('library.cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ContactFooter />
        </div>
    )
}