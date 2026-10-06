const ACTIVITY_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"];

type WatchIdleOptions = {
  timeout: number;
  onIdle: () => void;
  onActive: () => void;
  signal: AbortSignal;
};

export const watchIdle = ({
  timeout,
  onIdle,
  onActive,
  signal,
}: WatchIdleOptions) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let isIdle = false;

  const handleIdleTimeout = () => {
    isIdle = true;
    onIdle();
  };

  const handleActivity = () => {
    clearTimeout(timer);
    timer = setTimeout(handleIdleTimeout, timeout);

    if (!isIdle) return;

    isIdle = false;
    onActive();
  };

  const handlePointerMove = ({ movementX, movementY }: PointerEvent) => {
    // Layout changes under a still pointer can dispatch moves with no movement
    if (movementX === 0 && movementY === 0) return;

    handleActivity();
  };

  for (const type of ACTIVITY_EVENTS) {
    document.addEventListener(type, handleActivity, {
      signal,
      passive: true,
      capture: true,
    });
  }

  document.addEventListener("pointermove", handlePointerMove, {
    signal,
    passive: true,
    capture: true,
  });
  signal.addEventListener("abort", () => clearTimeout(timer));

  handleActivity();
};
