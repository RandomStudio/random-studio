import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"

const LazyVideo = React.forwardRef(
  ({ videoSrc, loops, isMuted, autoPlays }, ref) => {
    const [noJS, setNoJS] = useState(true)
    const [intersected, setIntersected] = useState(false)

    useEffect(() => {
      setNoJS(false)

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIntersected(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: "8%",
        }
      )

      observer.observe(ref.current)

      return () => {
        observer.unobserve(ref.current)
        observer.disconnect()
      }
    }, [noJS])

    return (
      <video
        ref={ref}
        src={intersected || noJS ? videoSrc : ""}
        loop={loops}
        muted={isMuted}
        autoplay={autoPlays}
        playsInline
      />
    )
  }
)

LazyVideo.propTypes = {}
LazyVideo.defaultProps = {}

export default LazyVideo
