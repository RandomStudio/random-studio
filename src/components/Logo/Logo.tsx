import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Logo.module.css';

type LogoProps = {
  isCentred: boolean;
};

const Logo = ({ isCentred }: LogoProps) => {
  const [hasGreeting, setHasGreeting] = useState(true);

  const logoClass = classNames(styles.logo, {
    [styles.hasGreeting]: hasGreeting,
    [styles.isCentre]: isCentred,
    [styles.isTop]: !isCentred,
  });

  const handleScroll = useCallback(() => {
    if (!hasGreeting) {
      return;
    }

    const currentScroll = window.scrollY;

    const windowHeight = window.innerHeight;
    const calculatedHeight = window.innerWidth / 1.777;

    const threshold = Math.min(windowHeight, calculatedHeight);

    if (currentScroll > threshold) {
      setHasGreeting(false);
    }
  }, [hasGreeting]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const textTop = useMemo(
    () => (hasGreeting ? 'Happy' : 'Random'),
    [hasGreeting],
  );

  const textBottom = useMemo(
    () => (hasGreeting ? '2024' : 'Studio'),
    [hasGreeting],
  );

  return (
    <h1 className={logoClass}>
      <Link href="/">
        {textTop}

        <br aria-hidden />

        {textBottom}
      </Link>
    </h1>
  );
};

export default Logo;
