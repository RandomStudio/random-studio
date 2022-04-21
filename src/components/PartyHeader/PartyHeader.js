import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';
import styles from './PartyHeader.module.scss';

const LazyLoadedWorld = dynamic(() => import('./World/World'), {
  ssr: false,
});

const PartyHeader = ({ isLive }) => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const handleUpdates = ({ new: { coords, ...rest } }) => {
      setShapes(currentShapes => [
        ...currentShapes,
        {
          ...rest,
          coords,
        },
      ]);
    };

    const getInitialData = async () => {
      const { data } = await supabase.from('shapes');

      setShapes(
        data.map(({ coords, ...rest }) => ({
          ...rest,
          coords: JSON.parse(coords),
        })),
      );
    };

    if (!isLive) {
      getInitialData();
    }

    supabase.from('shapes').on('INSERT', handleUpdates).subscribe();
  }, [isLive]);

  return (
    <div className={styles.frame}>
      <LazyLoadedWorld isLive={isLive} shapes={shapes} />
    </div>
  );
};

PartyHeader.propTypes = {
  isLive: PropTypes.bool,
};

PartyHeader.defaultProps = {
  isLive: true,
};

export default PartyHeader;
