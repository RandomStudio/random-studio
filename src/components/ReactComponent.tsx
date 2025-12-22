import { useEffect, useState } from 'preact/hooks';

const ReactComponent = () => {
  const [counter, setCounter] = useState(0);

  const [intervalDuration] = useState(Math.random() * 2000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, intervalDuration);

    return () => clearInterval(interval);

  }, [intervalDuration]);

  return <h2>React Component. Using Preact. Counter {counter}</h2>;
}

export default ReactComponent;