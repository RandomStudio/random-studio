import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import Intro from "../components/Studio/Intro/intro"
import Recruitee from "../components/Studio/Recruitee/recruitee"
import ImageCarousel from "../components/General/ImageCarousel/imageCarousel"
import InfoBlock from "../components/Studio/InfoBlock/infoBlock"

export const query = graphql`
  {
    studioPage: markdownRemark(frontmatter: { templateKey: { eq: "studio" } }) {
      frontmatter {
        intro
        infoBlock {
          collection {
            showIndicator
            info
            images {
              caption
              image
            }
          }
        }
        studioImpression {
          title
          showIndicator
          images {
            image
          }
        }
      }
    }
    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        address
        contact
      }
    }
  }
`

export default ({ data: { indexPage, studioPage } }) =>
  console.log(studioPage) || (
    <Layout>
      <Navigation />
      <Intro data={{ ...indexPage.frontmatter, ...studioPage.frontmatter }} />
      <Recruitee />
      {studioPage.frontmatter.infoBlock.map(({ collection }, index) => (
        <InfoBlock key={index} collection={collection} />
      ))}
      <ImageCarousel />
      <Footer {...indexPage.frontmatter} />
    </Layout>
  )
