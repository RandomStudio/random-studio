import styles from './Section.module.css';

type SectionProps = {
  anchor?: string;
  anchorLabel?: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isNarrow?: boolean;
};

const Section = ({ anchor, anchorLabel, children, className, isNarrow }: SectionProps) => {
  return (
    <section {...(anchor ? { id: anchor, 'aria-label': anchorLabel } : {})} className={`${styles.section} ${className} ${isNarrow ? styles.isNarrow : ''}`}>
      {children}
    </section>
  )
}

export default Section;
