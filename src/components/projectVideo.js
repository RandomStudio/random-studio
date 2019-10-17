import styles from "./projectVideo.module.scss"
import React, { useRef, useState } from "react"

const ProjectVideo = ({
  video: { autoplay, hasControls, isMuted, loops, url },
  ratio,
}) => {
  const videoRef = useRef(null)

  const [videoIsMuted, setVideoIsMuted] = useState(
    (autoplay && isMuted) || isMuted
  )
  const [isPlaying, setIsPlaying] = useState(autoplay)

  const handleMutedState = e => {
    setVideoIsMuted(prevState => !prevState)
    e.stopPropagation()
  }

  const handlePlayingState = e => {
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
      onClick={handlePlayingState}
      style={{ paddingBottom: `${ratio}%` }}
    >
      <video
        ref={videoRef}
        src={url}
        loop={loops}
        muted={videoIsMuted}
        autoPlay={isPlaying}
        playsInline
      />
      {hasControls && (
        <div className={styles.videoControls}>
          <button onClick={handlePlayingState}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleMutedState}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectVideo
