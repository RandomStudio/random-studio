import {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import styles from './Progress.module.css';
import useReactiveVideoProperty from './useReactiveVideoProperty';
import useMouseHoverPosition from './useMouseHoverPosition';

type ProgressProps = {
  className: string;
  onHover: (isHovering: boolean) => void;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
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
  const containerRef = useRef<HTMLDivElement>(null);

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

  const [isHovering, position] = useMouseHoverPosition(containerRef);

  const hoverOffset = position.x / position.width;

  useEffect(() => {
    onHover(isHovering);
  }, [isHovering, onHover]);

  const handleSeek = useCallback(() => {
    if (!duration || !videoRef.current) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    videoRef.current.currentTime = duration * hoverOffset;
  }, [duration, hoverOffset, videoRef]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={`${styles.container} ${className}`}
      onClick={handleSeek}
      ref={containerRef}
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
