/* eslint-disable react/no-multi-comp */
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';
import styles from './PartyHeader.module.scss';

const LazyLoadedWorld = dynamic(() => import('./World/World'), {
  loading: () => (
    <div className={styles.loader}>
      <div className={styles.spinner} />

      <p>Loading...</p>
    </div>
  ),
  ssr: false,
});

const PartyHeader = ({ isLive }) => {
  const frameRef = useRef(0);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const handleUpdates = ({ new: shape }) => {
      setShapes(currentShapes => [
        ...currentShapes,
        {
          ...shape,
          end: frameRef.current + (shape.end - shape.start),
          hasAdjustedForLive: true,
          start: frameRef.current,
        },
      ]);
    };

    const getInitialData = async () => {
      const { data } = await supabase.from('shapes');

      setShapes(
        data.map(({ coords, ...rest }) => ({
          ...rest,
          coords,
        })),
      );
    };

    if (!isLive) {
      getInitialData();
    }

    supabase.from('shapes').on('INSERT', handleUpdates).subscribe();

    return () => {
      supabase.removeAllSubscriptions();
    };
  }, [isLive]);

  const handleDeleteShape = useCallback(id => {
    setShapes(current => current.filter(shape => shape.id !== id));
  }, []);

  return (
    <div className={styles.frame}>
      <LazyLoadedWorld
        frameRef={frameRef}
        isLive={isLive}
        onDeleteShape={handleDeleteShape}
        shapes={shapes}
      />
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
