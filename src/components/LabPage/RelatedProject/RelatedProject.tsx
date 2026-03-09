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
  const articleJsx = (
    <article className={`${styles.project} ${className} ${relatedProject.link && styles.hasLink}`} onClick={() => {
      if (relatedProject.link) {
        window.location.href = relatedProject.link
      }
    }}>
      {relatedProject.featuredImage && (
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
      )}
      <div className={styles.title}>
        <p className={styles.secondLine}>{relatedProject.secondLine}</p>
      </div>
      <p className={styles.summary}>{relatedProject.summary}</p>
      {relatedProject.link && relatedProject.link !== '' && (
        <span className={styles.link}>
          View Project
        </span>
      )}
    </article>
  );

  if (relatedProject.link) {
    return (
      <Link href={relatedProject.link} className={styles.linkContainer}>
        {articleJsx}
      </Link>
    );
  }
  return articleJsx
}

export default RelatedProject;
