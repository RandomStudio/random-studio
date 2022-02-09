import React from 'react';
import { uniqueId } from 'lodash-es';
import Head from '../../../components/Head/Head';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/Project/ProjectDetail/ProjectDetail';
import BackScrim from '../../../components/Project/BackScrim/BackScrim';

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

  const SEOImage = (opengraph ? opengraph.ogImage : null) || undefined;

  return (
    <Layout>
      <Head
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
      <BackScrim />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const {
    getAllProjects,
    getContentFromFile,
  } = require('../../../utils/contentUtils');

  const data = getContentFromFile(`projects/${params.slug}`);
  const allProjects = getAllProjects();

  const { relatedProjects } = data;

  const relatedWork =
    relatedProjects &&
    (relatedProjects.projects || []).map(relatedProject => {
      const foundProject =
        allProjects.length &&
        allProjects.find(project => relatedProject.project === project.title);

      return {
        ...relatedProject,
        slug: foundProject ? foundProject.slug : null,
      };
    });

  return {
    props: {
      ...data,
      content: data.content.map(block => ({
        ...block,
        id: uniqueId(),
      })),
      relatedProjects: {
        ...relatedProjects,
        projects: relatedWork ?? [],
      },
    },
  };
};

export async function getStaticPaths() {
  const { getAllProjects } = require('../../../utils/contentUtils');
  const projects = getAllProjects();

  return {
    fallback: false,
    paths: projects.map(project => ({
      params: {
        slug: project.slug.replace('/projects/', ''),
      },
    })),
  };
}

export default Project;
