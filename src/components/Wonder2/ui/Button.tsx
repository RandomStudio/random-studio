import styles from './UI.module.css';

type ButtonProps = {
  hasOpenedUi: boolean;
  setHasOpenedUi: (value: boolean) => void;
};

const Button = ({ hasOpenedUi, setHasOpenedUi }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${hasOpenedUi ? styles.isOpen : ''}`}
      onClick={() => setHasOpenedUi(!hasOpenedUi)}
      type="button"
    >
      {hasOpenedUi ? 'X' : '?'}
    </button>
  );
};

export default Button;
