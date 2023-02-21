import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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

  const steps = [12, 16, 22, 24, 32, image.width];

  const delay = 40;

  useEffect(() => {
    canvasImage.current = new Image();
    mainImageRef.current = new Image();

    canvasImage.current.src = getPixelatedImage(image.src, '64');

    mainImageRef.current.src = image.src;

    canvasImage.current.onload = () => renderPixelated();
  }, []);

  const renderImage = (context, image, imageSize) => {
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    context.drawImage(image, 0, 0, imageSize, imageSize);

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

  const renderPixelated = () => {
    const context = canvasRef.current.getContext('2d');

    context.canvas.width = image.width * window.devicePixelRatio;
    context.canvas.height = image.height * window.devicePixelRatio;

    renderImage(context, canvasImage.current, steps[0]);
  };

  const nextStep = useCallback(
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

      window.setTimeout(() => nextStep(step + 1), delay);
    },
    [delay, steps],
  );

  useEffect(() => {
    if (isIntersecting && !isRendered) {
      nextStep(1);
    }
  }, [isIntersecting, isRendered, nextStep]);

  return (
    <div>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
};

export default PixelatedImage;
