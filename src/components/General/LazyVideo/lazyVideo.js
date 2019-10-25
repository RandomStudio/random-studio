import React, { useState, useEffect } from "react"

const LazyVideo = React.forwardRef(
  ({ videoSrc, loops, isMuted, autoPlays }, ref) => {
    console.log(autoPlays)

    const [noJS, setNoJS] = useState(true)
    const [intersected, setIntersected] = useState(false)

    useEffect(() => {
      // Referrence for cleanup
      const videoRef = ref
      setNoJS(false)

      const handlePlayer = () => {
        if (autoPlays) {
          videoRef.current.play()
        }
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIntersected(true)
              handlePlayer()
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
        playsInline
      />
    )
  }
)

LazyVideo.propTypes = {}
LazyVideo.defaultProps = {}

export default LazyVideo
