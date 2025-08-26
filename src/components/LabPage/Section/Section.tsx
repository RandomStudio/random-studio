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
    <section className={`${styles.section} ${className} ${isNarrow ? styles.isNarrow : ''}`}>
      {anchor && <div id={anchor} className={`${styles.anchor} anchor`} aria-label={anchorLabel} />}
      {children}
    </section>
  )
}

export default Section;
