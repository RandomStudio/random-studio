import React, { useState, useEffect } from "react"

const LazyVideo = React.forwardRef(
  ({ videoSrc, loops, isMuted, autoPlays }, ref) => {
    const [noJS, setNoJS] = useState(true)
    const [intersected, setIntersected] = useState(false)

    useEffect(() => {
      // Referrence for cleanup
      const videoRef = ref
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

      observer.observe(videoRef.current)

      return () => {
        observer.unobserve(videoRef.current)
        observer.disconnect()
      }
    }, [noJS, ref])

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
