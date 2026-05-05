import {SiTelegram, SiGithub, SiGmail} from 'react-icons/si'

export default function ContactFooter() {
    return (
        <footer className="contact-footer">
            <p className="contact-footer__eyebrow">Есть вопросы?</p>
            <h2 className="contact-footer__title">Свяжись со мной!</h2>
            <div className="contact-footer__links">
                <a href="https://t.me/tellmewhy322" className="contact-footer__link" target="_blank" rel="noopener">
                    <SiTelegram /> <span>Telegram</span>
                </a>
                <a href="https://github.com/aliveagain3228" className="contact-footer__link" target="_blank" rel="noopener">
                    <SiGithub /> <span>GitHub</span>
                </a>
                <a href="mailto:kojda1337@gmail.com" className="contact-footer__link" target="_blank" rel="noopener">
                    <SiGmail /> <span>Gmail</span>
                </a>
            </div>
        </footer>
    )
}