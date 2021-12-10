import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceList.module.scss';
import Image from '../../Image/Image';

const imageSizes = [
  '(max-width: 960px) 40vw, 80vw',
  '(max-width: 960px) 38vw, 80vw',
  '75vw',
];

const ServiceList = ({ headerTitle, services }) => (
  <>
    {headerTitle && <h2 className={styles.header}>{headerTitle}</h2>}
    <section className={styles.wrapper}>
      {services.map(({ title, copy, image }, index) => (
        <div className={styles.serviceBlock} key={`${title}-${image.id}`}>
          <div className={styles.copyWrapper}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
          <Image
            alt={title}
            className={styles.imageWrapper}
            sizes={imageSizes[index]}
            src={image}
          />
        </div>
      ))}
    </section>
  </>
);

ServiceList.propTypes = {
  headerTitle: PropTypes.string,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

ServiceList.defaultProps = {
  headerTitle: '',
};

export default ServiceList;
