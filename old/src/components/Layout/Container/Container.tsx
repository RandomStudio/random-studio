import { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  hasHorizontalConstraint?: boolean;
  hasVerticalPadding?: boolean;
};

const Container = ({
  children,
  className,
  hasHorizontalConstraint = true,
  hasVerticalPadding = true,
}: ContainerProps) => (
  <div
    className={`${styles.container}
    ${hasHorizontalConstraint && styles.hasHorizontalConstraint}
    ${hasVerticalPadding && styles.hasVerticalPadding}
    ${className}`}
  >
    {children}
  </div>
);

export default Container;
