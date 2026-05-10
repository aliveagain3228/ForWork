import { useState } from "react";
import { translations } from "../i18n/index.js";

export function useLocale() {
    const [locale, setLocale] = useState(() => {
        return localStorage.getItem('locale') || 'en'
    })

    const changeLocale = (newLocale) => {
        setLocale(newLocale)
        localStorage.setItem('locale', newLocale)
    }

    const t = (path) => {
        const keys = path.split('.')

        let result = translations[locale]

        for (const key of keys) {
            if (result && typeof result === 'object') {
                result = result[key]
            }
        }

        return typeof result === 'string' ? result : path
    }

    return { locale, changeLocale, t }
}