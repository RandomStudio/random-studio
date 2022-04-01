import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Image } from 'react-datocms';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import styles from './ContentBlock.module.scss';

const BLOCK_TYPES = {
  CarouselBlockRecord: 'CarouselBlockRecord',
  ImageBlockRecord: 'ImageBlockRecord',
  TextBlockRecord: 'TextBlockRecord',
  VideoBlockRecord: 'VideoBlockRecord',
};

const ContentBlock = ({
  __typename,
  url,
  width,
  loops,
  isMuted,
  isAlwaysMuted,
  isCentered, // missing
  hasControls,
  caption,
  autoplay,
  id,
  image,
  slides,
  marginLeft,
  marginTop,
  text,
}) => (
  <div
    className={styles.item}
    key={id}
    style={{
      '--marginLeft': `${marginLeft}%`,
      '--marginTop': `${marginTop}%`,
      '--width': `${width}%`,
    }}
  >
    {__typename === BLOCK_TYPES.ImageBlockRecord && (
      <>
        <Image
          data={image.imageData}
          layout="intrinsic"
          objectFit="cover"
          objectPosition="50% 50%"
        />
        <Caption caption={caption} marginLeft={marginLeft} />
      </>
    )}
    {__typename === BLOCK_TYPES.VideoBlockRecord && (
      <>
        <VideoWithControls
          autoplay={autoplay}
          caption={caption}
          hasControls={hasControls}
          isAlwaysMuted={isAlwaysMuted}
          isMuted={isMuted}
          loops={loops}
          url={url}
          width={width}
        />
        <Caption caption={caption} marginLeft={marginLeft} />
      </>
    )}
    {__typename === BLOCK_TYPES.CarouselBlockRecord && (
      <Carousel className={styles.carouselWrapper} slides={slides} />
    )}
    {__typename === BLOCK_TYPES.TextBlockRecord && (
      <div className={`${styles.text} ${isCentered ? styles.isCentered : ''}`}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    )}
  </div>
);

ContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  credits: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  relatedProjects: PropTypes.shape({
    blockTitle: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.object),
  }),
  allProjects: PropTypes.arrayOf(PropTypes.object),
};

ContentBlock.defaultProps = {
  allProjects: [],
  relatedProjects: null,
};

export default ContentBlock;
