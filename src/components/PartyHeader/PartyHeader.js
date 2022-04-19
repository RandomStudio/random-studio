import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './PartyHeader.module.scss';

const LazyLoadedWorld = dynamic(() => import('./World/World'), {
  ssr: false,
});

const PartyHeader = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const handleUpdates = ({ new: newShape }) => {
      setShapes(currentShapes => [...currentShapes, newShape]);
    };

    const getData = async () => {
      const { data } = await supabase.from('shapes');
      await supabase.from('shapes').on('INSERT', handleUpdates).subscribe();

      setShapes(data);
    };

    getData();
  }, []);

  return (
    <div className={styles.frame}>
      <LazyLoadedWorld shapes={shapes} />
    </div>
  );
};

export default PartyHeader;
