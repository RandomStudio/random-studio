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
import { PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import matter from 'gray-matter';
import { getContentFromFile } from '../../api/localDataUtils';

const mediumBreakpoint = 960; // BP of 60rem

const Studio = ({
  slug,
  title,
  introBlock,
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
        <Head pathName={slug} title="Studio" />
        <IntroBlock intros={introBlock} ref={introRef} title={title} />

        <ServiceList headerTitle={services.title} services={services.list} />

        <SkillBlock skillset={skillset} />

        <div className={styles.jobsImpressionBlock}>
          <Recruitee jobOpenings={jobOpenings} />
          <Carousel
            carousel={studioImpression.images}
            className={styles.carouselWrapper}
            showIndicator={studioImpression.showIndicator}
            title={studioImpression.title}
          />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  let response = await getDataFromBackend({
    query: PAGE_QUERY('studio'),
  });

  if (!response) {
    response = {
      page: {
        text: getContentFromFile('studio'),
      },
    }
  }

  const { page: { text } } = response

  const { data } = matter(text);

  return {
    props: data,
  };
};

export default Studio;
