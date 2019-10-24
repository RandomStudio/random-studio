import React, { useEffect, useRef, useState } from "react"
import Img from "gatsby-image"

const LazyImage = ({ image }) => {
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
    <Img ref={imageRef} fluid={image.childImageSharp.fluid} />
  ) : (
    <img ref={imageRef} alt="" src={intersected ? image : ""} />
  )
}

export default LazyImage
