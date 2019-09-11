import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.css"
import Img from "gatsby-image"

export const query = graphql`
  {
    allMarkdownRemark(sort: {fields: frontmatter___priority, order: DESC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            intro
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
  }
`

export default ({ data }) => (
  <Layout>
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
      {data.allMarkdownRemark.edges.map(
        ({
          node: {
            fields: { slug },
            frontmatter: project,
          },
        }) =>
          console.log(project) || (
            <Link
              className={styles.thumbnail}
              key={slug}
              id={slug}
              to={`/projects${slug}`}
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
              <div>{project.title}</div>
            </Link>
          )
      )}
    </div>
  </Layout>
)
