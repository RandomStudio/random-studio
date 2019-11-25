import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
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
  { name: "msapplication-TileColor", content: "#ffffff" },
]

const SEO = ({ title, description, image, pathName }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      markdownRemark(frontmatter: { key: { eq: "settings" } }) {
        frontmatter {
          title
          description
          twitterHandle
          siteUrl
        }
      }
    }
  `)

  const {
    markdownRemark: {
      frontmatter: {
        title: defaultTitle,
        description: defaultDescription,
        twitterHandle,
        siteUrl,
      },
    },
  } = data

  const metaTitle = title ? `${defaultTitle} - ${title}` : defaultTitle
  const url = `${siteUrl}${pathName}`
  const imageUrl = `${siteUrl}${image}`

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={metaTitle}
      meta={[
        ...defaultMeta,
        {
          name: "description",
          content: description || defaultDescription,
        },

        // OG
        { property: "og:title", content: `${metaTitle}` },
        { property: "og:site_name", content: "Random Studio" },
        {
          property: "og:description",
          content: description || defaultDescription,
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:url", content: `${url}` },
        {
          property: "og:image",
          content: imageUrl,
        },
        // Explicit image sizing for twitter
        {
          property: "og:image:width",
          content: 800,
        },
        {
          property: "og:image:height",
          content: 800,
        },
        // Twitter
        { name: "twitter:title", content: `${metaTitle}` },
        {
          name: "twitter:description",
          content: description || defaultDescription,
        },
        {
          name: "twitter:image",
          content: imageUrl,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: twitterHandle },
      ]}
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="/favicons/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicons/android-chrome-192x192.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#0000ff"
      />
      <link rel="manifest" href="/favicons/manifest.json" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathName: PropTypes.string.isRequired,
}

SEO.defaultProps = {
  title: "",
  description: "",
  image: "/og-image.jpg",
}

export default SEO
