import {
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Progress.module.css';
import useReactiveVideoProperty from './useReactiveVideoProperty';

type ProgressProps = {
  className: string;
  onHover: (isHovering: boolean) => void;
  videoRef: MutableRefObject<HTMLVideoElement>;
};

const formatDecimalAsTimestamp = (seconds: number) => {
  if (seconds === 0 || Number.isNaN(seconds)) {
    return '';
  }

  return new Date(seconds * 1000)
    .toUTCString()
    .split(' ')[4]
    .replace('00:', '');
};

const Progress = ({ className, onHover, videoRef }: ProgressProps) => {
  const duration = useReactiveVideoProperty(
    videoRef.current,
    'duration',
    'durationchange',
  );

  const progress = useReactiveVideoProperty(
    videoRef.current,
    'currentTime',
    'timeupdate',
  );

  const [isHovering, setIsHovering] = useState(false);
  const elementBoundingRect = useRef<DOMRect>(null);
  const [hoverOffset, setHoverOffset] = useState(0);

  useEffect(() => {
    onHover(isHovering);
  }, [isHovering, onHover]);

  const handleMouseOver = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const target = e.target as HTMLDivElement;
    elementBoundingRect.current = target.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback(
    e => {
      if (!isHovering) {
        return;
      }

      const { left, width } = elementBoundingRect.current;

      setHoverOffset((e.pageX - left) / width);
    },
    [isHovering],
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleSeek = useCallback(() => {
    // eslint-disable-next-line no-param-reassign
    videoRef.current.currentTime = duration * hoverOffset;
  }, [duration, hoverOffset, videoRef]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={`${styles.container} ${className}`}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      style={
        {
          '--hover-offset': hoverOffset,
          '--progress': `${progress / duration} `,
        } as CSSProperties
      }
    >
      <div
        className={styles.back}
        data-duration={formatDecimalAsTimestamp(duration)}
        data-hover-offset={formatDecimalAsTimestamp(duration * hoverOffset)}
      />

      <div
        className={styles.progress}
        data-current-time={formatDecimalAsTimestamp(progress)}
      />
    </div>
  );
};

export default Progress;
