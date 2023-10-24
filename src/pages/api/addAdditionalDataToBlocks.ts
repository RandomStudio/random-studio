import { getVideoDetailsByIdOnServer } from '../../server/methods';

const VIDEO_URL_KEYS = ['video', 'featuredVideo'];

// Do we need to manipulate a value returned by the Dato API response? Here's the place to do it.
const manipulateValue = async (key: string, value: string) => {
  if (VIDEO_URL_KEYS.includes(key)) {
    return getVideoDetailsByIdOnServer(value);
  }

  return value;
};

// @ts-expect-error This file needs refactoring
const iterateOverValue = async (key: string, value: string) => {
  if (!value) {
    return value;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map(async item => iterateOverValue(key, item)));
  }

  if (typeof value === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return addAdditionalInfoToBlocks(value);
  }

  return manipulateValue(key, value);
};

// @ts-expect-error This file needs refactoring
const addAdditionalInfoToBlocks = async (data: { [key: string]: string }) => {
  // @ts-expect-error This file needs refactoring
  const updatedData = await Promise.all(
    Object.entries(data).map(async ([key, value]) => [
      key,
      await iterateOverValue(key, value),
    ]),
  );

  return Object.fromEntries(updatedData);
};

export default addAdditionalInfoToBlocks;
