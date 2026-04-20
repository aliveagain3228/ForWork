import { motion } from "framer-motion"

export default function PageLoader() {
    return (
        <motion.div
            className="loader-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ pointerEvents: 'none' }}
        >
            <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: 2, duration: 0.4 }}
                style={{ fontSize: '3rem'}}
            >
                🧂
            </motion.span>
        </motion.div>
    )
}