import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image/withIEPolyfill';
import styles from './Highlight.module.scss';

const Highlight = ({ highlights }) => {
  return (
    <section className={styles.wrapper}>
      {highlights.map(({ copy, image }, index) => (
        <div
          key={image.id}
          className={`${styles.listItem} ${index % 2 ? '' : styles.reversed}`}
        >
          <div>
            <p>{copy}</p>
          </div>
          {image.childImageSharp ? (
            <Img
              objectFit="cover"
              loading="auto"
              fluid={image.childImageSharp.fluid}
            />
          ) : (
            <div>
              <img alt="" src={image} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

Highlight.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default Highlight;
