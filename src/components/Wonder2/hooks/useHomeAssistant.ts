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

// Keep in sync with the entity IDs whitelisted in the Home Assistant EC2 proxy
export const ENTITY_ID_WHITELIST = [
  'sun.sun',
  'sensor.knx_co2_main_space_2',
  'sensor.knx_co2_kitchen',
  'sensor.knx_co2_lobby',
  'sensor.knx_co2_lab',
  'sensor.knx_co2_upstairs',
  'sensor.knx_co2_meeting_view',
  'sensor.knx_co2_meeting_stairs',
  'binary_sensor.knx_alarm_main_2',
  'binary_sensor.knx_motion_arena',
  'binary_sensor.knx_motion_entrance',
  'binary_sensor.knx_motion_lab',
  'binary_sensor.knx_motion_main_area',
  'binary_sensor.knx_motion_meeting_view',
  'binary_sensor.knx_motion_meeting_stairs',
  'binary_sensor.knx_motion_silent',
] as const;

function useHomeAssistant<ValueType, AttributeType = DefaultAttributeType>(
  id: (typeof ENTITY_ID_WHITELIST)[number],
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
