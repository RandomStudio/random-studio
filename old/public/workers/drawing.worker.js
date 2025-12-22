/* eslint-disable no-restricted-syntax */
const drawShapes = (ctx, frameCount, shapes) => {
  for (const { color, coords, end, id, start } of shapes) {
    if (frameCount < start || frameCount > end + 100) {
      continue;
    }

    const alpha = frameCount < end ? 1 : 1 - (frameCount - end) / 100;

    if (alpha <= 0) {
      continue;
    }

    ctx.beginPath();
    const rgba = color.replace('rgb', 'rgba').replace(')', '');
    ctx.strokeStyle = `${rgba}, ${alpha})`;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.moveTo(coords[0].x, coords[0].y);

    const lifespan = end - start;

    const visibleCoords = Math.min(
      coords.length,
      (coords.length / lifespan) * (frameCount - start),
    );

    for (let i = 1; i < visibleCoords; i += 1) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }

    ctx.stroke();
    ctx.closePath();
  }
};

let frame = 0;

onmessage = ({ data }) => {
  const { canvas, shapes } = data;
  const ctx = canvas.getContext('2d');

  const startRendering = async () => {
    const animate = () => {
      frame += 5;
      ctx.clearRect(0, 0, 1920, 1080);

      drawShapes(ctx, frame, shapes);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  startRendering();
};
