import { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode | ReactNode[];
  isFullWidth: boolean;
  id: string;
};

const Container = ({ children, id, isFullWidth }: ContainerProps) => (
  <div
    className={`${styles.container} ${isFullWidth && styles.isFullWidth}`}
    id={id}
  >
    {children}
  </div>
);

export default Container;
