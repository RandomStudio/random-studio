/* eslint-disable react/no-multi-comp */
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
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

const PartyHeader = () => {
  const frameRef = useRef(0);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const getInitialData = async () => {
      const { data: earlyData } = await supabase.from('shapes_first');
      const { data } = await supabase.from('shapes');

      const set1 = earlyData.reduce(
        ([result, lastFrame], { coords, start, end, ...rest }) => {
          const adjustment =
            start > lastFrame + 100 ? start - lastFrame - 100 : 0;

          const endFrame = end - adjustment;

          return [
            [
              ...result,
              {
                ...rest,
                coords: JSON.parse(coords),
                end: endFrame,
                set: 1,
                start: start - adjustment,
              },
            ],
            endFrame,
          ];
        },
        [[], 0],
      );

      const set2 = data.reduce(
        ([result, lastFrame], { coords, start, end, ...rest }) => {
          const adjustment =
            start > lastFrame + 100 ? start - lastFrame - 100 : 0;

          const endFrame = end - adjustment;

          return [
            [
              ...result,
              {
                ...rest,
                coords: JSON.parse(coords),
                end: endFrame,
                set: 1,
                start: start - adjustment,
              },
            ],
            endFrame,
          ];
        },
        [[], 0],
      );

      setShapes([...set1[0], ...set2[0]]);
    };

    getInitialData();
  }, []);

  const handleDeleteShape = useCallback(id => {
    setShapes(current => current.filter(shape => shape.id !== id));
  }, []);

  return (
    <div className={styles.frame}>
      <LazyLoadedWorld
        frameRef={frameRef}
        onDeleteShape={handleDeleteShape}
        shapes={shapes}
      />
    </div>
  );
};

export default PartyHeader;
