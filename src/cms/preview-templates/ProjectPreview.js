import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectDetail from '../../components/Projects/ProjectDetail/ProjectDetail';

const ProjectPreview = ({ entry }) => (
  <Layout>
    <ProjectDetail {...entry.toJSON().data} />
  </Layout>
);

export default ProjectPreview;
