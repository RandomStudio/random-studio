import styles from './Section.module.css';

type SectionProps = {
  anchor?: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Section = ({ anchor, children, className }: SectionProps) => {
  return (
    <section {...(anchor ? { id: anchor } : {})} className={`${styles.section} ${className}`}>
      {children}
    </section>
  )
}

export default Section;
