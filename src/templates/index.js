import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import styles from "./index.module.css"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___priority, order: DESC }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              marginLeft
              width
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        address
        contact
        intro
        middle
      }
    }
  }
`

export default ({ data }) => (
  <Layout>
    <Navigation />
    <div className={styles.video}>
      <video
        src="https://player.vimeo.com/external/219822090.hd.mp4?s=9fcbf6bfec731604e4b4d29e278e676848c2ac20&profile_id=119"
        muted
        loop
        autoPlay
        playsInline
      />
      <h1 className={styles.logo}>
        Random
        <br />
        Studio
      </h1>
      <a href="/#projects" className={styles.videoOverlay}>
        Projects
      </a>
      <div className={styles.featuredAuthor}>
        <span className={styles.logo}>Random Studio</span>
        <span> × </span>
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/prendswash/"
          >
            Mark Prendergast
          </a>
        </span>
      </div>
    </div>
    <div id="projects" className={styles.projects}>
      <div className={styles.statement}>
        <ReactMarkdown
          escapeHtml={false}
          source={data.markdownRemark.frontmatter.intro}
        />
      </div>
      {data.allMarkdownRemark.edges.map(
        (
          {
            node: {
              fields: { slug },
              frontmatter: project,
            },
          },
          index,
          projects
        ) => (
          <>
            <Link
              className={styles.thumbnail}
              key={slug}
              id={slug}
              to={slug}
              style={{
                marginTop: `${project.thumbnail.marginTop}%`,
                marginLeft: `${project.thumbnail.marginLeft}%`,
                width: `${project.thumbnail.width}%`,
              }}
            >
              <div className={styles.media}>
                <Img
                  fluid={project.thumbnail.image.childImageSharp.fluid}
                  alt=""
                />
              </div>
              <div className={styles.title}>{project.title}</div>
            </Link>
            {(index === 5 ||
              (projects.length < 5 && index === projects.length - 1)) && (
              <div className={styles.statement}>
                <ReactMarkdown
                  escapeHtml={false}
                  source={data.markdownRemark.frontmatter.middle}
                />
              </div>
            )}
          </>
        )
      )}
    </div>
    <Footer
      address={data.markdownRemark.frontmatter.address}
      contact={data.markdownRemark.frontmatter.contact}
    />
  </Layout>
)
