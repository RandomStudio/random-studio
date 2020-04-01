import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styles from './Studio2.module.scss';
import Layout from '../../components/Layout/Layout';
import HighlightBlock from './HighlightBlock/HighlightBlock';
import ServiceList from './ServiceList/ServiceList';
import SEO from '../../components/SEO/SEO';
import Footer from '../../components/Footer/Footer';
import Recruitee from './Recruitee/Recruitee';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import SkillBlock from './SkillBlock/SkillBlock';

import useWindowSize from '../../utils/hooks/useWindowSize';

export const query = graphql`
  query StudioPage($templateKey: String!) {
    studioPage: markdownRemark(
      frontmatter: { templateKey: { eq: $templateKey } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        skillset
        highlights: highlight {
          copy
          image {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 70) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        services {
          title
          list {
            title
            copy
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        studioImpression {
          title
          showIndicator
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }

    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "Home" } }) {
      frontmatter {
        address
        email
        phone
      }
    }
  }
`;

const mediumBreakpoint = 768;

const Studio2 = ({
  data: {
    studioPage: { fields, frontmatter },
    indexPage,
  },
  location,
}) => {
  const highlightRef = useRef();
  const [themeClass, setThemeClass] = useState();

  const { width } = useWindowSize();

  useEffect(() => {
    if (window.IntersectionObserver) {
      setThemeClass(styles.darkTheme);

      const options = {
        rootMargin: '0px',
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
      observer.observe(highlightRef.current);
    }
  }, []);

  return (
    <Layout>
      <div
        className={`${styles.wrapper} ${
          width > mediumBreakpoint ? themeClass : ''
        }`}
      >
        <SEO title="Studio" pathName={fields.slug} />
        <HighlightBlock
          title={frontmatter.title}
          highlights={frontmatter.highlights}
          ref={highlightRef}
        />

        <ServiceList
          services={frontmatter.services.list}
          headerTitle={frontmatter.services.title}
        />

        <SkillBlock
          skillset={frontmatter.skillset}
          email={indexPage.frontmatter.email}
        />

        <div className={styles.jobsImpressionBlock}>
          <Recruitee location={location} />
          <ImageCarousel
            className={styles.carouselWrapper}
            images={frontmatter.studioImpression.images}
            showIndicator={frontmatter.studioImpression.showIndicator}
            title={frontmatter.studioImpression.title}
          />
        </div>

        <Footer {...indexPage.frontmatter} />
      </div>
    </Layout>
  );
};

export default Studio2;
