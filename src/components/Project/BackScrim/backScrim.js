import styles from "./backScrim.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import PropTypes from "prop-types"

const BackScrim = ({ returnUrl }) => {
  const intersectionRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const intersection = intersectionRef // For cleanup reference - according to eslint
    const handleScrimVisibility = event => {
      if (event.deltaY > 0 && !isVisible) {
        setIsVisible(true)
      }
    }

    const intersectCb = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener("wheel", handleScrimVisibility)
        } else {
          window.removeEventListener("wheel", handleScrimVisibility)
          setIsVisible(false)
        }
      })
    }

    const observer = new IntersectionObserver(intersectCb)
    observer.observe(intersection.current)

    return () => {
      observer.unobserve(intersection.current)
      observer.disconnect()
      window.removeEventListener("wheel", handleScrimVisibility)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.backScrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link to={returnUrl} className={styles.backButton}>
              Back to projects
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={intersectionRef} className={styles.intersectionLine} />

      {/* If JS disabled - just show it */}
      <noscript>
        <div className={styles.backScrim}>
          <Link to={returnUrl} className={styles.backButton}>
            Back to projects
          </Link>
        </div>
      </noscript>
    </>
  )
}

BackScrim.propTypes = {
  returnUrl: PropTypes.string.isRequired,
}

export default BackScrim
