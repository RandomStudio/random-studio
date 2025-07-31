import styles from "./RelatedProject.module.css";
import Image from "../../Image/Image";
import { LabRelatedProject } from "../../../types/types";
import Link from "next/link";

type RelatedProjectProps = {
  className?: string;
  relatedProject: LabRelatedProject;
}

const RelatedProject = ({ className, relatedProject }: RelatedProjectProps) => {
  return (
    <article className={`${styles.project} ${className}`}>
      {relatedProject.featuredImage && (
        <Link href={relatedProject.link} className={styles.linkContainer}>
          <Image alt={relatedProject.title} className={styles.image} data={relatedProject.featuredImage.imageData} />
        </Link>
      )}
      <Link href={relatedProject.link} className={styles.title}>
        <h3>{relatedProject.title}</h3>
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
      <Link href={relatedProject.link} className={styles.link}>
        View Project
      </Link>
    </article>
  )
}

export default RelatedProject;
