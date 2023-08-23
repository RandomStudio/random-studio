import React, { CSSProperties, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  BLOCK_TYPES,
  CarouselBlock,
  GenericBlockAttributes,
  ImageBlock,
  TextBlock,
  VideoBlock,
} from '../../../types/types';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import Video from '../../Video/Video';
import styles from './ContentBlock.module.scss';
import Markdown from '../../Markdown/Markdown';
import useMouseHoverPosition from '../../Video/Controls/Progress/useMouseHoverPosition';

type ContentBlockProps = {
  __typename: string;
  blocks?: ContentBlockProps[];
} & GenericBlockAttributes;

const ContentBlock = ({
  __typename,
  blocks = [],
  width,
  id,
  marginLeft,
  marginTop,
  anchorId,
  ...blockProps
}: ContentBlockProps) => {
  const router = useRouter();

  const handleClickVideo = useCallback(
    (videoEl: HTMLVideoElement) => {
      const { slug } = router.query;

      const time = videoEl.currentTime;

      const url = new URL(window.location.href);
      url.pathname = `/video/${videoEl.id}/`;
      url.searchParams.set('projectId', slug as string);
      url.searchParams.set('time', time.toString());
      router.push(url.href);
    },
    [router],
  );

  const videoRef = useRef<HTMLVideoElement>();

  const [isVideoMounted, setIsVideoMounted] = useState(false);

  const [isHovering, position] = useMouseHoverPosition(
    videoRef,
    isVideoMounted,
  );

  const handleVideoMounted = useCallback(() => {
    setIsVideoMounted(true);
  }, []);

  const renderBlock = () => {
    if (__typename === BLOCK_TYPES.ImageBlockRecord) {
      const { caption, image } = blockProps as ImageBlock;

      return (
        <>
          <Image
            data={image.imageData}
            layout="intrinsic"
            objectFit="cover"
            objectPosition="50% 50%"
            sizes={`(max-width: 576px) 100vw, ${width}vw`}
          />

          <Caption caption={caption} marginLeft={marginLeft} />
        </>
      );
    }

    if (__typename === BLOCK_TYPES.VideoBlockRecord) {
      const { caption, hasControls, autoplay, loops, video } =
        blockProps as VideoBlock;

      return (
        <>
          {video && (
            <div
              className={styles.videoWrapper}
              style={
                {
                  '--opacity': isHovering ? 1 : 0,
                  '--x': position.x,
                  '--y': position.y,
                } as CSSProperties
              }
            >
              <Video
                hasControls={hasControls}
                isAutoplaying={autoplay}
                isLooping={loops}
                onClick={handleClickVideo}
                onMount={handleVideoMounted}
                ref={videoRef}
                video={video}
              />
            </div>
          )}

          <Caption caption={caption} marginLeft={marginLeft} />
        </>
      );
    }

    if (__typename === BLOCK_TYPES.CarouselBlockRecord) {
      const { slides } = blockProps as CarouselBlock;

      return (
        <Carousel
          className={styles.carouselWrapper}
          sizes={`(max-width: 576px) 100vw, ${width}vw`}
          slides={slides}
        />
      );
    }

    if (__typename === BLOCK_TYPES.TextBlockRecord) {
      const { text } = blockProps as TextBlock;

      return (
        <div className={styles.text}>
          <Markdown markdown={text} />
        </div>
      );
    }

    if (__typename === BLOCK_TYPES.HorizontalRowRecord) {
      return (
        <div className={styles.horizontalRow}>
          {blocks.map(subblock => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ContentBlock {...subblock} key={subblock.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={styles.item}
      id={anchorId}
      key={id}
      style={
        {
          '--marginLeft': `${marginLeft}vw`,
          '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
          '--width': `${width}%`,
        } as CSSProperties
      }
    >
      {renderBlock()}
    </div>
  );
};

export default ContentBlock;
