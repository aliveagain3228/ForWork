import {useEffect, useState} from "react";
import { motion, AnimatePresence } from 'framer-motion'
import {GiSaltShaker} from "react-icons/gi";
import { useTranslation } from "../../context/LocaleContext.jsx";


export default function PageLoader() {
    const [isVisible, setIsVisible] = useState(true)
    const {t } = useTranslation()

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loader-container"
                    initial={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4}}
                >
                    <motion.div
                        animate={{
                            rotate: [0, -15, 15, -10, 10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            ease: 'easeInOut'
                        }}
                        style={{ fontSize: '3.5rem', display: 'inline-block'}}
                    >
                        <GiSaltShaker />
                    </motion.div>

                    <motion.p
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        style={{
                            color: 'var(--color-gray)',
                            marginTop: '16px',
                            fontSize: '0.9rem',
                            letterSpacing: '2px',
                        }}
                    >
                        {t('loader.text')}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}