import React, { useState, useEffect, useRef } from 'react';
import styles from './Studio.module.scss';
import Layout from '../../components/Layout/Layout';
import IntroBlock from '../../components/Studio/IntroBlock/IntroBlock';
import ServiceList from '../../components/Studio/ServiceList/ServiceList';
import Head from '../../components/Head/Head';
import Recruitee from '../../components/Studio/Recruitee/Recruitee';
import Carousel from '../../components/Carousel/Carousel';
import SkillBlock from '../../components/Studio/SkillBlock/SkillBlock';
import useWindowSize from '../../utils/hooks/useWindowSize';
import supportsIntersectionObserver from '../../utils/supportsIntersectionObserver';
import { STUDIO_PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import addAdditionalInfoToBlocks from '../../api/addAdditionalInfoToBlocks';

const mediumBreakpoint = 960; // BP of 60rem

const Studio = ({
  title,
  introBlocks,
  services,
  skillset,
  jobOpenings,
  studioImpression,
}) => {
  const introRef = useRef();
  const [themeClass, setThemeClass] = useState('');
  const { width } = useWindowSize();

  useEffect(() => {
    if (!supportsIntersectionObserver) {
      return undefined;
    }

    setThemeClass(styles.darkTheme);

    const options = {
      rootMargin: '-120px 0px 0px 0px',
    };

    const cb = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setThemeClass(styles.darkTheme);
        } else {
          setThemeClass('');
        }
      });
    };

    const observer = new IntersectionObserver(cb, options);
    observer.observe(introRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div
        className={`${styles.wrapper} ${width > mediumBreakpoint ? themeClass : ''
          }`} // Makes it scrollable with keyboard
        tabIndex="-1"
      >
        <Head title="Studio" />
        <IntroBlock intros={introBlocks} ref={introRef} title={title} />

        <ServiceList services={services} />

        <SkillBlock skillset={skillset} />

        <div className={styles.jobsImpressionBlock}>
          <Recruitee jobOpenings={jobOpenings} />
          <Carousel
            className={styles.carouselWrapper}
            showIndicator
            slides={studioImpression}
            title="Studio Impressions"
          />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({ preview }) => {
  const { page } = await getDataFromBackend({
    query: STUDIO_PAGE_QUERY,
    preview,
  });

  return {
    props: {
      ...page,
      introBlocks: await addAdditionalInfoToBlocks(page.introBlocks),
    },
  };
};

export default Studio;
