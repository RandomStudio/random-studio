import React from 'react';
import getThumbnailSafely from '../../../utils/getThumbnailSafely';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/Projects/ProjectDetail/ProjectDetail';
import SEO from '../../../components/SEO/SEO';
import BackScrim from '../../../components/Projects/BackScrim/BackScrim';

const Project = ({
  allProjects,
  intro,
  opengraph,
  content,
  credits,
  relatedProjects,
  slug,
  title,
}) => {
  const socialTitle =
    opengraph && opengraph.ogTitle ? opengraph.ogTitle : undefined;

  const socialDescription =
    opengraph && opengraph.ogDescription ? opengraph.ogDescription : undefined;

  const SEOImage =
    (opengraph ? getThumbnailSafely(opengraph.ogImage) : null) || undefined;

  return (
    <Layout>
      <SEO
        description={intro}
        image={SEOImage}
        pathName={slug}
        socialDescription={socialDescription}
        socialTitle={socialTitle}
        title={title}
      />
      <ProjectDetail
        allProjects={allProjects}
        content={content}
        credits={credits}
        intro={intro}
        relatedProjects={relatedProjects}
        title={title}
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
    },
  };
}

export async function getStaticPaths() {
  const { getAllProjects } = require('../../../utils/blog');
  const projects = getAllProjects();

  return {
    fallback: false,
    paths: projects.map(project => ({
      params: {
        slug: project.slug.replace('projects/', ''),
      },
    })),
  };
}

export default Project;
