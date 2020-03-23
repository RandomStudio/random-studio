import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Highlight from './Highlight/Highlight';
import Service from './Service/Service';
import SEO from '../../components/SEO/SEO';

export const query = graphql`
  query StudioPage($templateKey: String!) {
    studioPage: markdownRemark(
      frontmatter: { templateKey: { eq: $templateKey } }
    ) {
      fields {
        slug
      }
      frontmatter {
        highlights: highlight {
          copy
          image {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 70) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

const Studio2 = ({
  data: {
    studioPage: { fields, frontmatter },
  },
}) => {
  return (
    <Layout>
      <SEO title="Studio" pathName={fields.slug} />
      <Highlight highlights={frontmatter.highlights} />
      <Service />
    </Layout>
  );
};

export default Studio2;
