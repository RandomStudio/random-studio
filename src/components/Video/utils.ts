import videojs from 'video.js';
import Player from 'video.js/dist/types/player.d';

type ComponentTypes =
  | 'Button' // https://docs.videojs.com/playtoggle
  | 'PlayToggle' // https://docs.videojs.com/button
  | 'ProgressControl'; // https://docs.videojs.com/progresscontrol

type OptionValuesTypes = string | (() => void);

type CustomComponentTypes = {
  currentPlayer: Player;
  index: number;
  options: { [key: string]: OptionValuesTypes };
};

const addMuteButton = (currentPlayer, options, index): CustomComponentTypes => {
  const MuteToggleConstructor = videojs.getComponent('VolumePanel');

  // @ts-expect-error Incomplete typings on the videojs library
  const MuteToggleComponent = new MuteToggleConstructor(
    currentPlayer,
    options,
    index,
  );

  MuteToggleComponent.removeChild('VolumeControl');

  currentPlayer
    .getChild('ControlBar')
    .addChild(MuteToggleComponent, options, index);

  return MuteToggleComponent;
};

const addPlayToggle = (currentPlayer, options, index): CustomComponentTypes => {
  const ComponentConstructor = videojs.getComponent('PlayToggle');

  // @ts-expect-error Incomplete typings on the videojs library
  const customComponent = new ComponentConstructor(
    currentPlayer,
    options,
    index,
  );

  currentPlayer
    .getChild('ControlBar')
    .addChild(customComponent, options, index);

  return customComponent;
};

const addDownloadButton = (
  currentPlayer,
  options,
  index,
): CustomComponentTypes => {
  const ComponentConstructor = videojs.getComponent('Button');
  // @ts-expect-error Incomplete typings on the videojs library

  const DownloadButtonComponent = new ComponentConstructor(
    currentPlayer,
    options,
    index,
  );

  currentPlayer.getChild('ControlBar').addChild(DownloadButtonComponent);

  // console.log(MuteToggleComponent.children());

  return DownloadButtonComponent;
};

// New functions will be added
// eslint-disable-next-line import/prefer-default-export
export { addPlayToggle, addMuteButton, addDownloadButton };
