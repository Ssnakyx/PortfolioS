import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const blocks = ["#0d1a3a", "#1a6aff", "#7dd4fc"];

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} style={{ position: "relative" }}>

        {blocks.map((color, i) => (
          <motion.div
            key={i}
            style={{
              position: "fixed",
              inset: 0,
              background: color,
              zIndex: 999 - i,
              originX: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 0.45,
              delay: i * 0.05,
              times: [0, 0.4, 0.6, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          {children}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
