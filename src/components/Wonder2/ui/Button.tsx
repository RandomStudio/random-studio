import styles from './UI.module.css';

const Button = ({ hasOpenedUi, setHasOpenedUi }) => {
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
