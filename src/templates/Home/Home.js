import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ProjectList from './ProjectList/ProjectList';
import HomeVideo from './HomeVideo/HomeVideo';
import SEO from '../../components/SEO/SEO';

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___priority, order: DESC }
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
    markdownRemark(frontmatter: { templateKey: { eq: "Home" } }) {
      fields {
        slug
      }
      frontmatter {
        address
        contact
        collaborationCredits {
          collaborator
          url
        }
        intro
        middle
        projects {
          caption
          project
          thumbnail {
            ratio
            marginLeft
            marginTop
            video
            width
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        video
      }
    }
  }
`;

const Home = ({
  data: {
    allMarkdownRemark: {
      edges,
    },
    markdownRemark: {
      fields,
      frontmatter,
    },
  },
}) => (
  <Layout>
    <SEO pathName={fields.slug} />
    <Navigation />
    <HomeVideo
      videoUrl={frontmatter.video}
      collaborationCredits={frontmatter.collaborationCredits}
    />
    <ProjectList
      {...frontmatter}
      projects={frontmatter.projects.map(
        ({
          caption,
          project,
          thumbnail,
        }) => {
          const relation = edges.find(e => (
            e.node.frontmatter.title === frontmatter.projects[0].project
          ));
          return {
            slug: relation ? relation.node.fields.slug : null,
            title: caption || project,
            thumbnail,
          };
        },
      )}
    />
    <Footer {...frontmatter} />
  </Layout>
);

Home.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape,
      frontmatter: PropTypes.shape,
    }),
  }).isRequired,
};

export default Home;
