import videojs from 'video.js';
import Player from 'video.js/dist/types/player.d';

type ComponentTypes =
  | 'Button' // https://docs.videojs.com/playtoggle
  | 'PlayToggle' // https://docs.videojs.com/button
  | 'ProgressControl'; // https://docs.videojs.com/progresscontrol

type OptionValuesTypes = string | (() => void);

const replaceVideoPlayerComponent = (
  currentPlayer: Player,
  component: ComponentTypes,
  options: {
    [key: string]: OptionValuesTypes;
  },
) => {
  const ComponentConstructor = videojs.getComponent(component);

  // @ts-expect-error Incomplete typings on the videojs library
  const customComponent = new ComponentConstructor(currentPlayer, options);

  const existingPlayButton = currentPlayer
    .getChild('ControlBar')
    .getChild(component);

  currentPlayer.getChild('ControlBar').removeChild(existingPlayButton);

  currentPlayer.getChild('ControlBar').addChild(customComponent, null, 0);

  return customComponent;
};

// New functions will be added
// eslint-disable-next-line import/prefer-default-export
export { replaceVideoPlayerComponent };
