import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiSaltShaker } from "react-icons/gi";
import { useTranslation } from "../../context/LocaleContext.jsx";

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const { locale, changeLocale, t } = useTranslation()
    const [isLangOpen, setIsLangOpen] = useState(false)

    const LANGS = [
        { locale: 'ru', label: 'Русский', flag: 'RU'},
        { locale: 'en', label: 'English', flag: 'EN' },
        { locale: 'ua', label: 'Українська', flag: 'UA' },
    ]

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const headerClass = `app-header ${isScrolled ? 'app-header--scrolled' : ''}`

    return (
        <header className={headerClass}>
            <div className="app-header__left" onClick={() => navigate('/')}>
                <GiSaltShaker className="app-header__logo" />
                <span className="app-header__brand">Spice Calc</span>
            </div>

            <nav className="app-header__nav">
                <button
                    onClick={() => navigate('/')}
                    className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
                >
                    {t('nav.myRecipes')}
                </button>

                <button
                    onClick={() => navigate('/calculator')}
                    className={`nav-link ${location.pathname === '/calculator' ? 'nav-link--active' : ''}`}
                >
                    {t('nav.calculate')}
                </button>
            </nav>

            <div className="lang-switcher">
                <button
                    onClick={() => setIsLangOpen(prev => !prev)}
                    className="nav-link lang-switcher__toggle">
                    {LANGS.find(l => l.locale === locale)?.flag} ▼
                </button>

                {isLangOpen && (
                    <>
                        <div
                            className="lang-switcher__overlay"
                            onClick={() => setIsLangOpen(false)}
                        />
                        <div className="lang-switcher__menu">
                            {LANGS.map(lang => (
                                <button
                                key={lang.locale}
                                onClick={() => { changeLocale(lang.locale); setIsLangOpen(false)}}
                                className={`lang-switcher__option ${locale === lang.locale ? 'lang-switcher__option--active' : ''}`}
                                >
                                    <span className="lang-switcher__flag">{lang.flag}</span>
                                    <span className="lang-switcher__label">{lang.label}</span>
                                    {locale === lang.locale && <span className="lang-switcher__check">✓</span>}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </header>
    )
}