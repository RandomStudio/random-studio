import React from "react"
import { Helmet } from "react-helmet"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const defaultMeta = [
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
  { name: "msapplication-TileColor", content: "#da532c" },
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
    sizes="32x32"
    href="/favicons/favicon-32x32.png"
  />,
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/favicons/favicon-16x16.png"
  />,
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/favicons/android-chrome-192x192.png"
  />,
  <link rel="manifest" href="/favicons/site.webmanifest" />,
  <link
    rel="mask-icon"
    href="/favicons/safari-pinned-tab.svg"
    color="#0000ff"
  />,
  <link rel="manifest" href="/favicons/manifest.json" />,
  <link rel="shortcut icon" href="/favicons/favicon.ico" />,
]

const SEO = ({ title, description, image = "/og-image.jpg", pathName }) => {
  const metaTitle = title ? `Random Studio - ${title}` : "Random Studio"
  const url = `https://random.studio${pathName}`

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          description
          image
        }
      }
    }
  `)

  console.log("static query", data)

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={metaTitle}
      meta={[
        ...defaultMeta,
        {
          name: "description",
          content:
            description ||
            "Random Studio is an experience design studio. We are an international team of visual artists, strategists and engineers who blur the boundaries between art, design and technology.",
        },
        // OG
        { property: "og:title", content: `${metaTitle}` },
        { property: "og:site_name", content: "Random Studio" },
        {
          property: "og:description",
          content: description,
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:url", content: `${url}` },
        {
          property: "og:image",
          content: `random.studio${image}`,
        },
        // Twitter
        { name: "twitter:title", content: `${metaTitle}` },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: `random.studio${image}`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@random_studio" },
      ]}
    >
      {favicons}
    </Helmet>
  )
}

export default SEO
