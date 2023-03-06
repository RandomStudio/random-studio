import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './PixelatedImage.module.css';
import useInView from '../../hooks/useInView';

const getPixelatedImage = (src, width) => {
  const url = new URL(src);

  url.searchParams.set('w', width);
  url.searchParams.delete('h');

  return url.href;
};

const PixelatedImage = ({ image }) => {
  const [isRendered, setIsRendered] = useState(false);

  const canvasRef = useRef();
  const mainImageRef = useRef();
  const canvasImage = useRef();

  const isIntersecting = useInView(canvasRef, {
    threshold: 0.75,
  });

  const steps = useMemo(() => [12, 16, 22, 24, 32, image.width], [image.width]);

  const delay = 40;

  const renderImage = (context, imageSrc, imageSize) => {
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    context.drawImage(imageSrc, 0, 0, imageSize, imageSize);

    context.drawImage(
      context.canvas,
      0,
      0,
      imageSize,
      imageSize,
      0,
      0,
      context.canvas.width,
      context.canvas.height,
    );
  };

  const renderPixelated = useCallback(() => {
    const context = canvasRef.current.getContext('2d');

    context.canvas.width = image.width * window.devicePixelRatio;
    context.canvas.height = image.height * window.devicePixelRatio;

    renderImage(context, canvasImage.current, steps[0]);
  }, [image.height, image.width, steps]);

  useEffect(() => {
    canvasImage.current = new Image();
    mainImageRef.current = new Image();

    canvasImage.current.src = getPixelatedImage(image.src, '64');

    mainImageRef.current.src = image.src;

    canvasImage.current.onload = () => renderPixelated();
  }, [image.src, renderPixelated]);

  const renderStep = useCallback(
    step => {
      const context = canvasRef.current.getContext('2d');
      context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      const newSize = steps[step];
      renderImage(context, mainImageRef.current, newSize);

      if (step >= steps.length) {
        setIsRendered(true);

        return;
      }

      window.setTimeout(() => renderStep(step + 1), delay);
    },
    [delay, steps],
  );

  useEffect(() => {
    if (isIntersecting && !isRendered) {
      renderStep(1);
    }
  }, [isIntersecting, isRendered, renderStep]);

  return (
    <div>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
};

PixelatedImage.propTypes = {
  image: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default PixelatedImage;
