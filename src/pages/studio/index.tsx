import PropTypes from 'prop-types';
import Carousel from '../../components/Carousel/Carousel';
import styles from './Studio.module.css';
import getDataFromBackend from '../../api/getDataFromBackend';
import addAdditionalInfoToBlocks from '../../api/addAdditionalInfoToBlocks';
import {
  dayNightImageBlockPropType,
  slidePropType,
  vacancyPropType,
} from '../../propTypes';
import { STUDIO_PAGE_QUERY } from '../../api/QUERIES';
import Layout from '../../components/Layout/Layout';
import Block from '../../components/Studio/Block/Block';
import Vacancies from '../../components/Studio/Vacancies/Vacancies';
import Head from '../../components/Head/Head';

const socialLinks = {
  Instagram: 'https://instagram.com/random_studio/',
  LinkedIn: 'https://www.linkedin.com/company/random-studio/',
  Medium: 'https://medium.com/random-studio/',
};

const Studio = ({ blurb, blocks, skillset, studioImpression, vacancies }) => (
  <Layout isNewDesign>
    <Head />

    <p className={styles.blurb} dangerouslySetInnerHTML={{ __html: blurb }} />

    {skillset && (
      <div className={styles.skills}>
        <ul className={styles.list}>
          <li className={styles.heading}>{'Design'}</li>

          {skillset.design?.map(designArea => (
            <li key={designArea}>{designArea}</li>
          ))}
        </ul>

        <ul className={styles.list}>
          <li className={styles.heading}>{'Technology'}</li>

          {skillset.technology?.map(technologyArea => (
            <li key={technologyArea}>{technologyArea}</li>
          ))}
        </ul>

        <ul className={styles.list}>
          <li className={styles.heading}>{'Product'}</li>

          {skillset.product?.map(productArea => (
            <li key={productArea}>{productArea}</li>
          ))}
        </ul>
      </div>
    )}

    <Carousel
      caption="Studio Impressions"
      className={styles.carousel}
      sizes="(max-width: 768px) 100vw, 50vw"
      slides={studioImpression.map(content => ({ image: content }))}
    />

    {blocks.map(block => (
      <Block
        block={block}
        className={`${styles.block} ${styles.bcorp}`}
        key={block.copy}
      />
    ))}

    <div className={styles.links}>
      <div className={styles.list}>
        <h3 className={styles.heading}>{'Start a conversation'}</h3>

        <a href="mailto:hello@random.studio">{'hello@random.studio'}</a>
      </div>

      <div className={styles.list}>
        <h3 className={styles.heading}>{'New business inquiries'}</h3>

        <a href="mailto:business@random.studio">{'business@random.studio'}</a>
      </div>

      <div className={styles.list}>
        <h3 className={styles.heading}>{'Press inquiries'}</h3>

        <a href="mailto:press@random.studio">{'press@random.studio'}</a>
      </div>

      <div className={styles.list}>
        <h3 className={styles.heading}>{'Follow us'}</h3>

        <div className={styles.social}>
          {Object.entries(socialLinks).map(([name, url]) => (
            <div className={styles.link} key={name}>
              <a href={url} rel="noopener noreferrer" target="_blank">
                {name}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Vacancies className={styles.vacancies} vacancies={vacancies} />
    </div>
  </Layout>
);

export const getStaticProps = async ({ preview }) => {
  const { page } = await getDataFromBackend({
    query: STUDIO_PAGE_QUERY,
    preview,
  });

  return {
    props: {
      ...page,
      blocks: await addAdditionalInfoToBlocks(page.blocks),
    },
  };
};

Studio.propTypes = {
  blocks: PropTypes.arrayOf(dayNightImageBlockPropType).isRequired,
  blurb: PropTypes.string.isRequired,
  skillset: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  studioImpression: PropTypes.arrayOf(slidePropType).isRequired,
  vacancies: PropTypes.arrayOf(vacancyPropType).isRequired,
};

export default Studio;