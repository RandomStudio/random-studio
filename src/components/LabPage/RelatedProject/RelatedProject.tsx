import styles from "./RelatedProject.module.css";
import Image from "../../Image/Image";
import { LabRelatedProject } from "../../../types/types";
import Link from "next/link";
import Video from "../../Video/Video";

type RelatedProjectProps = {
  className?: string;
  relatedProject: LabRelatedProject;
}

const RelatedProject = ({ className, relatedProject }: RelatedProjectProps) => {
  return (
    <article className={`${styles.project} ${className}`}>
      {relatedProject.featuredImage && (
        <Link href={relatedProject.link} className={styles.linkContainer}>
          <div className={styles.media}>
            {relatedProject.featuredVideo ? (
              <Video hasControls={false} video={relatedProject.featuredVideo} />
            ) : (
              <Image
                alt="" // Keeps the screen reader focused on project list
                data={relatedProject.featuredImage.imageData}
                sizes={`(max-width: 576px) 100vw, 50vw`}
              />
            )}
          </div>
        </Link>
      )}
      <Link href={relatedProject.link} className={styles.title}>
        <h3>{relatedProject.title}</h3>
        <p className={styles.secondLine}>{relatedProject.secondLine}</p>
        {relatedProject.inProgress && (
          <span className={styles.inProgress}>In Progress</span>
        )}
      </Link>
      {relatedProject.tags && relatedProject.tags.length > 0 && (
        <div className={styles.tags}>
          {relatedProject.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      <p className={styles.summary}>{relatedProject.summary}</p>
      {relatedProject.link && relatedProject.link !== '' && (
        <Link href={relatedProject.link} className={styles.link}>
          View Project
        </Link>
      )}
    </article>
  )
}

export default RelatedProject;
