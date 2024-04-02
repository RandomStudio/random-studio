import { SUSTAINABILITY_PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import SustainabilitySection from '../../components/SustainabilitySection/SustainabilitySection';
import styles from './Sustainability.module.css';
import { SustainabilityBlock } from '../../types/types';

type SustainabilityTypes = {
  content: SustainabilityBlock[];
  intro: string;
  seoDescription?: string;
  seoTitle?: string;
};

const Sustainability = ({
  intro,
  content,
  seoTitle = undefined,
  seoDescription = undefined,
}: SustainabilityTypes) => {
  return (
    <Layout description={seoDescription} title={seoTitle}>
      <div
        className={styles.blurb}
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {content.map(section => (
        <SustainabilitySection key={section.title || ''} section={section} />
      ))}
    </Layout>
  );
};

export default Sustainability;

export const getStaticProps = async () => {
  const { page } = await getDataFromBackend({
    query: SUSTAINABILITY_PAGE_QUERY,
  });

  return {
    props: {
      ...page,
    },
  };
};
