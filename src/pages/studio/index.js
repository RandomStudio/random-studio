import React, { useState, useEffect, useRef } from 'react';
import styles from './Studio.module.scss';
import Layout from '../../components/Layout/Layout';
import IntroBlock from '../../components/Studio/IntroBlock/IntroBlock';
import ServiceList from '../../components/Studio/ServiceList/ServiceList';
import Logo from '../../components/Logo/Logo';
import SEO from '../../components/SEO/SEO';
import Footer from '../../components/Footer/Footer';
import Recruitee from '../../components/Studio/Recruitee/Recruitee';
import Carousel from '../../components/Carousel/Carousel';
import SkillBlock from '../../components/Studio/SkillBlock/SkillBlock';
import useWindowSize from '../../utils/hooks/useWindowSize';

const mediumBreakpoint = 960; // BP of 60rem

const Studio = ({
  address,
  phone,
  slug,
  title,
  introBlock,
  services,
  skillset,
  email,
  jobOpenings,
  studioImpression
}) => {
  const introRef = useRef();
  const [themeClass, setThemeClass] = useState(styles.darkTheme);
  const { width } = useWindowSize();

  useEffect(() => {
    if (window.IntersectionObserver) {
      setThemeClass(styles.darkTheme);

      const options = {
        rootMargin: '-120px 0px 0px 0px',
      };

      const cb = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setThemeClass(styles.darkTheme);
          } else {
            setThemeClass('');
          }
        });
      };

      const observer = new IntersectionObserver(cb, options);
      observer.observe(introRef.current);
    }
  }, []);

  return (
    <Layout>
      <div
        tabIndex="-1" // Makes it scrollable with keyboard
        className={`${styles.wrapper} ${
          width > mediumBreakpoint ? themeClass : ''
        }`}
      >
        <SEO title="Studio" pathName={slug} />
        <Logo />
        <IntroBlock
          title={title}
          intros={introBlock}
          ref={introRef}
        />

        <ServiceList
          services={services.list}
          headerTitle={services.title}
        />

        <SkillBlock
          skillset={skillset}
          email={email}
        />

        <div className={styles.jobsImpressionBlock}>
          <Recruitee jobOpenings={jobOpenings} />
          <Carousel
            className={styles.carouselWrapper}
            carousel={studioImpression.images}
            showIndicator={studioImpression.showIndicator}
            title={studioImpression.title}
          />
        </div>

        <Footer address={address} email={email} phone={phone} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const { getContentFromFile } = require('../../utils/blog');

  const index = getContentFromFile('index');
  const studio = getContentFromFile('studio');
  console.log(studio)
  return {
    props: {
      ...index,
      ...studio,
    }
  };
}

export default Studio;
