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
    Test
  </Layout>
);

export const getStaticProps = async preview => { };

Studio.propTypes = {
  blocks: PropTypes.arrayOf(dayNightImageBlockPropType).isRequired,
  blurb: PropTypes.string.isRequired,
  skillset: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  studioImpression: PropTypes.arrayOf(slidePropType).isRequired,
  vacancies: PropTypes.arrayOf(vacancyPropType).isRequired,
};

export default Studio;
