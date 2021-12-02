import React from 'react';
import getThumbnailSafely from '../../../utils/getThumbnailSafely';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/Projects/ProjectDetail/ProjectDetail';
import SEO from '../../../components/SEO/SEO';
import BackScrim from '../../../components/Projects/BackScrim/BackScrim';

const Project = ({ allProjects, intro, opengraph, content, credits, relatedProjects, slug, title }) => {
  const socialTitle =
    opengraph && opengraph.ogTitle ? opengraph.ogTitle : undefined;

  const socialDescription =
    opengraph && opengraph.ogDescription ? opengraph.ogDescription : undefined;

  const SEOImage =
    (opengraph ? getThumbnailSafely(opengraph.ogImage) : null) || undefined;

  return (
    <Layout>
      <SEO
        pathName={slug}
        title={title}
        description={intro}
        image={SEOImage}
        socialDescription={socialDescription}
        socialTitle={socialTitle}
      />
      <ProjectDetail
        allProjects={allProjects}
        content={content}
        title={title}
        intro={intro}
        credits={credits}
        relatedProjects={relatedProjects}
      />
      {typeof window !== 'undefined' && <BackScrim returnUrl="projects" />}
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const { getAllProjects, getContentFromFile } = require('../../../utils/blog');

  const data = getContentFromFile(`projects/${params.slug}`);
  const allProjects = getAllProjects();

  return {
    props: {
      allProjects,
      ...data,
    }
  };
}

export async function getStaticPaths() {
  const { getAllProjects } = require('../../../utils/blog');
  const projects = getAllProjects();

  return {
    paths: projects.map(project => {
      return {
        params: {
          slug: project.slug.replace('projects/', ''),
        },
      };
    }),
    fallback: false,
  };
}

export default Project;
