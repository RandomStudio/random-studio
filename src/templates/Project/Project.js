import React from 'react';
import { graphql } from 'gatsby';
import getThumbnailSafely from '../../utils/getThumbnailSafely';
import Layout from '../../components/Layout/Layout';
import ProjectDetail from '../../components/ProjectDetail/ProjectDetail';
import SEO from '../../components/SEO/SEO';
import BackScrim from './BackScrim/BackScrim';

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    allProjects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "Project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }

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
          alt
          marginTop
          marginLeft
          zIndex
          video {
            autoplay
            hasControls
            isAlwaysMuted
            isMuted
            loops
            url
          }
          carousel {
            url
            caption
            image {
              childImageSharp {
                fluid(maxHeight: 700, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          width
        }
        relatedProjects {
          blockTitle
          projects {
            title
            subtitle
            image {
              childImageSharp {
                fluid(maxWidth: 3840, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            project
          }
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

const Project = props => {
  const {
    data: {
      allProjects: { edges: allProjects },
      markdownRemark: {
        fields: { slug },
        frontmatter: project,
      },
    },
  } = props;

  const { opengraph } = project;

  const returnSlug = `#${slug}`;

  const socialTitle = opengraph && opengraph.ogTitle ? opengraph.ogTitle : undefined;

  const socialDescription = opengraph && opengraph.ogDescription
    ? opengraph.ogDescription
    : undefined;

  const SEOImage = (opengraph ? getThumbnailSafely(opengraph.ogImage) : null) || undefined;

  console.log(project);

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
      <ProjectDetail {...project} allProjects={allProjects} />
      {typeof window !== 'undefined' && <BackScrim returnUrl={returnSlug} />}
    </Layout>
  );
};

export default Project;
