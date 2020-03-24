import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceList.module.scss';
import FluidImage from '../../../components/FluidImage/FluidImage';

const ServiceList = ({ headerTitle, services }) => {
  return (
    <section className={styles.wrapper}>
      {headerTitle && <h2>{headerTitle}</h2>}

      {services.map(({ title, copy, image }) => (
        <div key={image.id} className={styles.serviceBlock}>
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
          <FluidImage image={image} />
        </div>
      ))}
    </section>
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
