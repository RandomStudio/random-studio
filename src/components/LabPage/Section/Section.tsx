import styles from './Section.module.css';

type SectionProps = {
  anchor?: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isNarrow?: boolean;
};

const Section = ({ anchor, children, className, isNarrow }: SectionProps) => {
  return (
    <section {...(anchor ? { id: anchor } : {})} className={`${styles.section} ${className} ${isNarrow ? styles.isNarrow : ''}`}>
      {children}
    </section>
  )
}

export default Section;
