import React from "react"
import { Helmet } from "react-helmet"

const defaultMeta = [
  {
    name: "description",
    content:
      "Random Studio is an experience design studio. We are an international team of visual artists, strategists and engineers who blur the boundaries between art, design and technology.",
  },
  {
    name: "author",
    content: "Random Studio",
  },
  {
    name: "keywords",
    content:
      "Random Studio, Digital Agency, Digital Production, Daan Lucas, Technology Workshop, Creative Studio",
  },
  { name: "msapplication-config", content: "/favicons/browserconfig.xml" },
  { name: "theme-color", content: "#ffffff" },
]

const favicons = [
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/favicons/apple-touch-icon.png"
  />,
  <link
    rel="icon"
    type="image/png"
    href="/favicons/favicon-32x32.png"
    sizes="32x32"
  />,
  <link
    rel="icon"
    type="image/png"
    href="/favicons/favicon-16x16.png"
    sizes="16x16"
  />,
  <link rel="manifest" href="/favicons/manifest.json" />,
  <link
    rel="mask-icon"
    href="/favicons/safari-pinned-tab.svg"
    color="#0000ff"
  />,
  <link rel="shortcut icon" href="/favicons/favicon.ico" />,
]

const SEO = () => {
  return <Helmet meta={[...defaultMeta]}>{favicons}</Helmet>
}

export default SEO
