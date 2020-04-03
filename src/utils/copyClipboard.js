/* eslint-disable import/prefer-default-export */
export const copyEmail = (event, target, callback) => {
  try {
    window.getSelection().selectAllChildren(target);
    document.execCommand('copy');
    callback(true);
    window.setTimeout(() => callback(false), 3000);

    if (window.getSelection().empty) {
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      window.getSelection().removeAllRanges();
    }

    event.preventDefault();
  } catch (error) {
    console.log(
      'Failed to copy. Will open mailto link as normal. Error:',
      error,
    );
  }
};
