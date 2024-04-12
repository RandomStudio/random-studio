import { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode | ReactNode[];
  hasHorizontalConstraint?: boolean;
  hasVerticalPadding?: boolean;
};

const Container = ({
  children,
  hasHorizontalConstraint = true,
  hasVerticalPadding = true,
}: ContainerProps) => (
  <div
    className={`${styles.container}
    ${hasHorizontalConstraint && styles.hasHorizontalConstraint}
    ${hasVerticalPadding && styles.hasVerticalPadding}`}
  >
    {children}
  </div>
);

export default Container;
