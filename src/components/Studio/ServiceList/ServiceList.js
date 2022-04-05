import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceList.module.scss';
import Image from '../../Image/Image';

const imageSizes = [
  '(max-width: 960px) 40vw, 80vw',
  '(max-width: 960px) 38vw, 80vw',
  '75vw',
];

const ServiceList = ({ services }) => (
  <>
    <h2 className={styles.header}>{'Our Areas of Expertise'}</h2>
    <section className={styles.wrapper}>
      {services.map(({ title, copy, image }, index) => (
        <div className={styles.serviceBlock} key={`${title}-${image.id}`}>
          <div className={styles.copyWrapper}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              alt={title}
              data={image.imageData}
              sizes={imageSizes[index]}
            />
          </div>
        </div>
      ))}
    </section>
  </>
);

ServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ServiceList;
