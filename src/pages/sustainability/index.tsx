import PropTypes from "prop-types";
import { SUSTAINABILITY_PAGE_QUERY } from "../../api/QUERIES";
import getDataFromBackend from "../../api/getDataFromBackend";
import Layout from "../../components/Layout/Layout";
import Head from "../../components/Head/Head";
import SustainabilitySection from "../../components/SustainabilitySection/SustainabilitySection";
import styles from "./Sustainability.module.css";
import { ContentBlockType } from "../../types";

type SustainabilityTypes = {
  content: ContentBlockType[],
  intro: string;
  seoDescription?: string;
  seoTitle?: string;
}

const Sustainability = ({ intro, content, seoTitle = null, seoDescription = null }: SustainabilityTypes) => {
  return (
    <Layout isNewDesign>
      <Head description={seoDescription} title={seoTitle} />

      <div
        className={styles.blurb}
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {content.map((section) => (
        <SustainabilitySection key={section.title || ''} section={section} />
      ))}
    </Layout>
  );
};

export default Sustainability;

export const getStaticProps = async ({ preview }) => {
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
