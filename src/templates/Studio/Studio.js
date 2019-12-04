import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Intro from './Intro/Intro';
import InfoBlock from './InfoBlock/InfoBlock';
import Impression from './Impression/Impression';
import SEO from '../../components/SEO/SEO';
import Wonder from './Wonder/Wonder';

export const query = graphql`
  {
    studioPage: markdownRemark(frontmatter: { templateKey: { eq: "Studio" } }) {
      fields {
        slug
      }
      frontmatter {
        intro
        infoBlock {
          collection {
            showIndicator
            info
            images {
              caption
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
        studioImpression {
          title
          showIndicator
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "Home" } }) {
      frontmatter {
        address
        contact
      }
    }
  }
`;

export default ({ location, data: { indexPage, studioPage } }) => (
  <Layout>
    <SEO title="Studio" pathName={studioPage.fields.slug} />
    <Navigation />
    <Intro
      data={{ ...indexPage.frontmatter, ...studioPage.frontmatter }}
      location={location}
    />
    {studioPage.frontmatter.infoBlock.map(({ collection }, index) => (
      <InfoBlock key={index} collection={collection} />
    ))}
    <Impression data={studioPage.frontmatter.studioImpression} />
    <Footer {...indexPage.frontmatter} />
  </Layout>
);
