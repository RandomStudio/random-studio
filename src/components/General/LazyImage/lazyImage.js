import React, { useEffect, useRef, useState } from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"

const LazyImage = ({ image, objectFit }) => {
  let imageRef = useRef()
  const [noJS, setNoJS] = useState(true)
  const [intersected, setIntersected] = useState(false)

  useEffect(() => {
    setNoJS(false)

    const observer = new IntersectionObserver(
      entries => {
        // Can only be one image
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIntersected(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "5%" }
    )

    if (
      imageRef.current &&
      imageRef.current.imageRef &&
      imageRef.current.imageRef.current
    ) {
      // Reference of a ref in a component
      observer.observe(imageRef.current.imageRef.current)
    } else {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [noJS])

  if (noJS) return <img ref={imageRef} alt="" src={image} />

  return image.childImageSharp ? (
    <Img
      style={{ minHeight: "1px", minWidth: "1px" }}
      ref={imageRef}
      objectFit={objectFit}
      fluid={intersected ? image.childImageSharp.fluid : {}}
    />
  ) : (
    <img ref={imageRef} alt="" src={intersected ? image : ""} />
  )
}

LazyImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  objectFit: PropTypes.string,
}

LazyImage.defaultProps = {
  // image:
  objectFit: "cover",
}

export default LazyImage
