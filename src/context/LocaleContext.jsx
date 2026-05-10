import { createContext, useContext } from "react";
import { useLocale } from '../hooks/useLocale'

const LocaleContext = createContext(null)

export function LocaleProvider({children}) {
    const localeData = useLocale()

    return (
        <LocaleContext.Provider value={localeData}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useTranslation() {
    const ctx = useContext(LocaleContext)
    if (!ctx) throw new Error('useTranslation must be inside LocaleProvider')
    return ctx
}