export const record = (canvas, time) => {
  const recordedChunks = [];

  return new Promise(res => {
    const stream = canvas.captureStream(25 /* fps */);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9',
    });

    // ondataavailable will fire in interval of `time || 4000 ms`
    mediaRecorder.start(time || 4000);

    mediaRecorder.ondataavailable = event => {
      recordedChunks.push(event.data);

      // after stop `dataavilable` event run one more time
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      res(url);
    };
  });
};

export const recordCanvas = async (canvas, time) => {
  const recording = record(canvas, time);
  const video$ = document.createElement('video');
  document.body.appendChild(video$);
  recording.then(url => video$.setAttribute('src', url));

  // download it
  const link$ = document.createElement('a');
  link$.setAttribute('download', 'recordingVideo');

  recording.then(url => {
    link$.setAttribute('href', url);
    link$.click();
  });
};
