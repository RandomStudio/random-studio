import React from 'react';
import { uniqueId } from 'lodash-es';
import Head from '../../../components/Head/Head';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/Project/ProjectDetail/ProjectDetail';
import BackScrim from '../../../components/Project/BackScrim/BackScrim';
import getDataFromBackend from '../../../api/getDataFromBackend';
import { PROJECTS_LIST_QUERY, PAGE_QUERY } from '../../../api/QUERIES';
import matter from 'gray-matter';
import { getAllProjects, getContentFromFile } from '../../../api/localDataUtils';

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
  let response = await getDataFromBackend({
    query: [PAGE_QUERY(`projects/${params.slug}`), PROJECTS_LIST_QUERY],
  });

  if (!response) {
    response = {
      page: {
        text: getContentFromFile(`projects/${params.slug}`),
      },
      projectsList: {
        projects: getAllProjects(),
      }
    }
  }

  const { page: { text }, projectsList: { projects } } = response;

  const { data } = matter(text);

  const { relatedProjects } = data;

  // TODO: This can be avoided by changing `project` property to be slug rather than title
  // Matching non slug/ID is a bad move anyway
  const relatedWork =
    relatedProjects &&
    (relatedProjects.projects || []).map(relatedProject => {
      const foundProject =
        projects.length &&
        projects.find(project => relatedProject.project === project.title);

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
      //   relatedProjects: {
      //     ...relatedProjects,
      //     projects: relatedWork ?? [],
      //   },
    },
  };
};

export async function getStaticPaths() {
  let response = await getDataFromBackend({
    query: PROJECTS_LIST_QUERY,
  });

  if (!response) {
    response = {
      projectsList: {
        projects: getAllProjects(),
      }
    }
  }

  const { projectsList: { projects } } = response;

  return {
    fallback: false,
    paths: projects.map(project => ({
      params: {
        slug: project.name.replace('.md', ''),
      },
    })),
  };
}

export default Project;
