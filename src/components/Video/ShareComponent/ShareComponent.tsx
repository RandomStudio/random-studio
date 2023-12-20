import React from 'react';
import styles from './ShareComponent.module.scss';

type ShareComponentProps = {
  hasCopiedShareLink: boolean;
  onCopyLink: () => void;
  setIsShowingShareOptions: (isShowing: boolean) => void;
};

const ShareComponent = ({
  hasCopiedShareLink,
  onCopyLink,
  setIsShowingShareOptions,
}: ShareComponentProps) => {
  const handleShareVia = async () => {
    navigator.share({
      title: 'Video',
      text: 'Video',
      url: window.location.href,
    });
  };

  return (
    <div className={styles.shareComponentWrapper}>
      <button
        className={styles.share}
        onClick={() => setIsShowingShareOptions(false)}
        type="button"
      >
        {'Cancel'}
      </button>

      <button className={styles.share} onClick={onCopyLink} type="button">
        {hasCopiedShareLink ? 'Copied!' : 'Copy Link'}
      </button>

      <button className={styles.share} onClick={handleShareVia} type="button">
        {'Share Via'}
      </button>
    </div>
  );
};

export default ShareComponent;
