import styles from "./projectVideo.module.scss"
import React, { useRef, useState } from "react"

const ProjectVideo = ({
  video: { autoplay, hasControls, isMuted: isStartingMuted, loops, url },
  ratio,
}) => {
  const videoRef = useRef(null)

  const [hasPlayed, setHasPlayed] = useState(autoplay)

  const [isCurrentlyMuted, setVideoIsCurrentlyMuted] = useState(
    autoplay || isStartingMuted
  )
  const [isPlaying, setIsPlaying] = useState(autoplay)

  const handleTapVolumeToggle = e => {
    setVideoIsCurrentlyMuted(prevState => !prevState)
    e.stopPropagation()
  }

  const handleTapPlayPause = e => {
    setHasPlayed(true)
    setIsPlaying(prevState => {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }

      return !prevState
    })
    e.stopPropagation()
  }

  return (
    <div
      className={styles.videoWrapper}
      onClick={handleTapPlayPause}
      style={{ paddingBottom: `${ratio}%` }}
    >
      <video
        ref={videoRef}
        src={url}
        loop={loops}
        muted={isCurrentlyMuted}
        autoPlay={isPlaying}
        playsInline
      />
      {hasControls &&
        (hasPlayed ? (
          <div className={styles.videoControls}>
            <button onClick={handleTapPlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleTapVolumeToggle}>
              {isCurrentlyMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        ) : (
          <div className={styles.beforeFirstPlay}>Play video</div>
        ))}
    </div>
  )
}

export default ProjectVideo
