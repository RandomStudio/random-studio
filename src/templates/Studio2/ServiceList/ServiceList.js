import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceList.module.scss';
import FluidImage from '../../../components/FluidImage/FluidImage';

const ServiceList = ({ headerTitle, services }) => {
  return (
    <>
      {headerTitle && <h2 className={styles.header}>{headerTitle}</h2>}
      <section className={styles.wrapper}>
        {services.map(({ title, copy, image }) => (
          <div key={image.id} className={styles.serviceBlock}>
            <div className={styles.copyWrapper}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <FluidImage className={styles.imageWrapper} image={image} />
          </div>
        ))}
      </section>
    </>
  );
};

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
