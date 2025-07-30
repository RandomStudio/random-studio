import styles from "./RelatedProject.module.css";
import Image from "../../Image/Image";
import { LabRelatedProject } from "../../../types/types";

type RelatedProjectProps = {
  className?: string;
  relatedProject: LabRelatedProject;
}

const RelatedProject = ({ className, relatedProject }: RelatedProjectProps) => {
  return (
    <article className={`${styles.project} ${className}`}>
      {relatedProject.featuredImage && <Image alt={relatedProject.title} className={styles.image} data={relatedProject.featuredImage.imageData} />}
      <h3 className={styles.title}>{relatedProject.title}</h3>
      {relatedProject.tags && relatedProject.tags.length > 0 && (
        <div className={styles.tags}>
          {relatedProject.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      <p className={styles.summary}>{relatedProject.summary}</p>
      <a href={relatedProject.link} className={styles.link} target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    </article>
  )
}

export default RelatedProject;
