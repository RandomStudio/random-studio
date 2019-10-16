import styles from "./projectVideo.module.scss"
import React, { useRef, useState } from "react"

const ProjectVideo = ({ video }) => {
  const videoRef = useRef(null)

  // TODO: Change when cms is updated
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  // TODO: Add hasControls from CMS
  const hasControls = true

  const handleMutedState = e => {
    setIsMuted(prevState => !prevState)
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
      style={{ paddingBottom: `${56.25}%` }}
    >
      <video
        ref={videoRef}
        src={video}
        loop
        muted={isMuted}
        // autoPlay={autoplay}
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
