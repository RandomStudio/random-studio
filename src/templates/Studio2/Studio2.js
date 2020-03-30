import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styles from './Studio2.module.scss';
import Layout from '../../components/Layout/Layout';
import Highlight from './Highlight/Highlight';
import ServiceList from './ServiceList/ServiceList';
import SEO from '../../components/SEO/SEO';
import Footer from '../../components/Footer/Footer';
import Message from './Message/Message';
import Recruitee from './Recruitee/Recruitee';
import SkillList from './SkillList/SkillList';
import Conversation from './Conversation/Conversation';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';

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
        message
        skillsets
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

const Studio2 = ({
  data: {
    studioPage: { fields, frontmatter },
    indexPage,
  },
  location,
}) => {
  const highlightRef = useRef();
  const [themeClass, setThemeClass] = useState();

  useEffect(() => {
    console.log(highlightRef);

    if (window.IntersectionObserver) {
      setThemeClass(styles.darkTheme);

      const options = {
        rootMargin: '0px',
      };

      const cb = entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setThemeClass(styles.darkTheme);
          } else {
            setThemeClass();
          }
        });
      };

      const observer = new IntersectionObserver(cb, options);
      observer.observe(highlightRef.current);
    }
  }, []);

  return (
    <Layout>
      <div className={`${styles.wrapper} ${themeClass}`}>
        <SEO title="Studio" pathName={fields.slug} />
        <Highlight
          title={frontmatter.title}
          highlights={frontmatter.highlights}
          ref={highlightRef}
        />

        {/* tb removed */}
        {/* <Message message={frontmatter.message} /> */}

        <ServiceList
          services={frontmatter.services.list}
          headerTitle={frontmatter.services.title}
        />

        <div className={styles.skillContactBlock}>
          <SkillList skillsets={frontmatter.skillsets} />
          <Conversation email={indexPage.frontmatter.email} />
        </div>

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
