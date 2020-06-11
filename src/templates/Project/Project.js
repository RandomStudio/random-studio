import React from 'react';
import { graphql } from 'gatsby';
import getThumbnailSafely from '../../utils/getThumbnailSafely';
import Layout from '../../components/Layout/Layout';
import ProjectDetail from '../../components/ProjectDetail/ProjectDetail';
import SEO from '../../components/SEO/SEO';
import BackScrim from './BackScrim/BackScrim';

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        intro
        content {
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 3840, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          marginTop
          marginLeft
          ratio
          video {
            autoplay
            hasControls
            isAlwaysMuted
            isMuted
            loops
            url
          }
          width
        }
        credits {
          key
          value
        }
        opengraph {
          ogDescription
          ogImage {
            childImageSharp {
              fixed(width: 800, height: 800) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          ogTitle
        }
      }
    }
  }
`;

const Project = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: project,
    },
  },
}) => {
  const { opengraph } = project;

  const returnSlug = `#${slug}`;

  const socialTitle = opengraph && opengraph.ogTitle ? opengraph.ogTitle : undefined;

  const socialDescription = opengraph && opengraph.ogDescription
    ? opengraph.ogDescription
    : undefined;

  const SEOImage = (opengraph ? getThumbnailSafely(opengraph.ogImage) : null) || undefined;

  return (
    <Layout>
      <SEO
        pathName={slug}
        title={project.title}
        description={project.intro}
        image={SEOImage}
        socialDescription={socialDescription}
        socialTitle={socialTitle}
      />
      <ProjectDetail {...project} />
      {typeof window !== 'undefined' && <BackScrim returnUrl={returnSlug} />}
    </Layout>
  );
};

export default Project;
