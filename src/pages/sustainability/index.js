import ReactMarkdown from 'react-markdown';
import { SUSTAINABILITY_PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import SustainabilitySection from '../../components/SustainabilitySection/SustainabilitySection';

import styles from './Sustainability.module.css';

const Sustainability = props => {
  const { intro, content: sections } = props;

  return (
    <Layout isNewDesign>
      <Head description={intro} title="Sustainability" />

      <p className={styles.blurb}>
        Green is our Default <br />

        <br />
        When we work on a project we work as sustainable as possible
      </p>

      {sections.map(section => (
        <SustainabilitySection key={section.title} section={section} />
      ))}
    </Layout>
  );
};

export default Sustainability;

export const getStaticProps = async ({ preview }) => {
  const { page } = await getDataFromBackend({
    query: SUSTAINABILITY_PAGE_QUERY,
    preview: true,
  });

  return {
    props: {
      ...page,
    },
  };
};
