import videojs from 'video.js';
import Component from 'video.js/dist/types/component';
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

const addMuteButton = (currentPlayer, index, options): CustomComponentTypes => {
  const MuteToggleConstructor = videojs.getComponent('VolumePanel');
  // @ts-expect-error Incomplete typings on the videojs library
  const MuteToggleComponent = new MuteToggleConstructor(currentPlayer, options);

  MuteToggleComponent.removeChild('VolumeControl');

  // const existingVolumePanel = currentPlayer.getChild('VolumePanel');
  // .getChild('VolumePanel');

  // currentPlayer.getChild('ControlBar').removeChild(existingVolumePanel);

  currentPlayer
    .getChild('ControlBar')
    // .addChild(customComponent, null, index)
    .addChild(MuteToggleComponent, options, index);

  console.log(MuteToggleComponent.children());

  return MuteToggleComponent as Component;
};

const addPlayToggle = (currentPlayer, index, options): CustomComponentTypes => {
  const ComponentConstructor = videojs.getComponent('PlayToggle');

  // @ts-expect-error Incomplete typings on the videojs library
  const customComponent = new ComponentConstructor(currentPlayer, options);

  currentPlayer
    .getChild('ControlBar')
    .addChild(customComponent, options, index);

  return customComponent as Component;
};

const replaceVideoPlayerComponents = (currentPlayer: Player) => {
  // return {
  //   playButton: replacePlayPauseButton(),
  //   muteButton: replaceMuteButton(),
  // };
};

// New functions will be added
// eslint-disable-next-line import/prefer-default-export
export { addPlayToggle, addMuteButton, replaceVideoPlayerComponents };
