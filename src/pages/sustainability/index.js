import PropTypes from 'prop-types';
import { SUSTAINABILITY_PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import SustainabilitySection from '../../components/SustainabilitySection/SustainabilitySection';
import styles from './Sustainability.module.css';

const Sustainability = ({ intro, content, seoTitle, seoDescription }) => {
  return (
    <Layout isNewDesign>
      <Head description={seoDescription} title={seoTitle} />

      <div
        className={styles.blurb}
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {content.map(section => (
        <SustainabilitySection key={section.title} section={section} />
      ))}
    </Layout>
  );
};

export default Sustainability;

export const getStaticProps = async preview => {
  const { page } = await getDataFromBackend({
    query: SUSTAINABILITY_PAGE_QUERY,
    preview,
  });

  return {
    props: {
      ...page,
    },
  };
};

Sustainability.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  intro: PropTypes.string.isRequired,
  seoDescription: PropTypes.string,
  seoTitle: PropTypes.string,
};

Sustainability.defaultProps = {
  seoDescription: null,
  seoTitle: null,
};
