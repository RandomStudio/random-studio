import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Highlight from './Highlight/Highlight';
import ServiceList from './ServiceList/ServiceList';
import SEO from '../../components/SEO/SEO';
import Message from './Message/Message';

export const query = graphql`
  query StudioPage($templateKey: String!) {
    studioPage: markdownRemark(
      frontmatter: { templateKey: { eq: $templateKey } }
    ) {
      fields {
        slug
      }
      frontmatter {
        message
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
        services {
          title
          list {
            title
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
      <Message message={frontmatter.message} />

      <ServiceList
        services={frontmatter.services.list}
        headerTitle={frontmatter.services.title}
      />
    </Layout>
  );
};

export default Studio2;
