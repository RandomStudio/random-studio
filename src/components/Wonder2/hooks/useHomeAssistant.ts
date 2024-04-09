import { useEffect, useState } from 'react';

const socket = new WebSocket(
  'ws://ec2-16-171-7-233.eu-north-1.compute.amazonaws.com:8080',
);

let state: { [key: string]: [] } = {};

const handleMessage = (event: MessageEvent) => {
  try {
    if (event.data === 'Connection established') {
      console.log('Connected to Home Assistant');

      return;
    }

    const payload = JSON.parse(event.data);

    state = {
      ...state,
      ...payload,
    };

    console.log('Received message from Home Assistant', payload);
  } catch (e) {
    console.error('Failed to parse message from Home Assistant', e);
  }
};

socket.addEventListener('message', handleMessage);

type DefaultAttributeType = { [key: string]: string | number };

function useHomeAssistant<ValueType, AttributeType = DefaultAttributeType>(
  id: string,
) {
  const [entityState, setEntityState] = useState<{
    value: ValueType;
    attributes: AttributeType;
  }>(
    state[id]?.reverse()?.[0] || {
      value: null,
      attributes: {},
    },
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    const handleUpdate = () => {
      if (!state[id]) {
        return;
      }

      setEntityState(state[id].reverse()[0]);
    };

    socket.addEventListener('message', handleUpdate);
  }, [id]);

  return entityState;
}

export default useHomeAssistant;
