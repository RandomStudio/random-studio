import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Intro.module.scss';
import Recruitee from '../Recruitee/Recruitee';

const Intro = React.forwardRef(({ data: { address, contact, intro }, location }, ref) => (
  <>
    <h1 className={styles.logo}>
      Random
      <br />
      Studio
    </h1>
    <div className={styles.intro} ref={ref}>
      <header className={styles.introHeader}>
        <div className={styles.address}>
          <div>
            <ReactMarkdown
              escapeHtml={false}
              source={address}
              linkTarget="__blank"
            />
          </div>
          <div>
            <ReactMarkdown escapeHtml={false} source={contact} />
          </div>
        </div>

        <ReactMarkdown escapeHtml={false} source={intro} />
      </header>
      <Recruitee location={location} />
    </div>
  </>
));

export default Intro;
