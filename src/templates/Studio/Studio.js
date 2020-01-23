import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
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
                    ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
        email
        phone
      }
    }
  }
`;

export default ({ location, data: { indexPage, studioPage } }) => {
  const introRef = useRef();
  return (
    <Layout>
      <SEO title="Studio" pathName={studioPage.fields.slug} />
      <Wonder introRef={introRef} />
      <Intro
        data={{ ...indexPage.frontmatter, ...studioPage.frontmatter }}
        location={location}
        ref={introRef}
      />
      {studioPage.frontmatter.infoBlock.map(({ collection }, index) => (
        <InfoBlock key={index} collection={collection} />
      ))}
      <Impression data={studioPage.frontmatter.studioImpression} />
      <Footer {...indexPage.frontmatter} />
    </Layout>
  );
};
