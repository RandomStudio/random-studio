import React, { useState } from 'react';
import styles from './ShareComponent.module.scss';

type ShareComponentProps = {
  setShowShareDialog: (isShareComponent: boolean) => void;
};

const ShareComponent = ({ setShowShareDialog }: ShareComponentProps) => {
  const [copyLinkText, setCopyLinkText] = useState('Copy Link');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyLinkText('Copied!');

    setTimeout(() => {
      setCopyLinkText('Copy Link');
    }, 5000);
  };

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
        onClick={() => setShowShareDialog(false)}
        type="button"
      >
        {'Cancel'}
      </button>

      <button className={styles.share} onClick={handleCopyLink} type="button">
        {copyLinkText}
      </button>

      <button className={styles.share} onClick={handleShareVia} type="button">
        {'Share Via'}
      </button>
    </div>
  );
};

export default ShareComponent;
