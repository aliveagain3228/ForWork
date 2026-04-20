import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiSaltShaker } from "react-icons/gi";

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.srollY> 20)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const headerClass = `app-header ${isScrolled ? 'app-header--scrolled' : ''}`

    return (
        <header className="app-header">
            <div className="app-header__left">

            </div>
            <div className="app-header__logo" onClick={() => navigate('/')}>
                <GiSaltShaker /> Spice Calc
            </div>

            <nav className="app-header__nav">
                <button
                    onClick={() => navigate('/')}
                    className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
                >
                    Мои рецепты
                </button>

                <button
                    onClick={() => navigate('/calculator')}
                    className={`nav-link ${location.pathname === '/calculator' ? 'nav-link--active' : ''}`}
                >
                    Рассчитать
                </button>
            </nav>
        </header>
    )
}