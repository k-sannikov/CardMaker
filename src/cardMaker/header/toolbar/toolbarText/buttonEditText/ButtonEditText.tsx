import styles from './ButtonEditText.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ButtonEditTextProps = {
  icon: IconDefinition,
  onClick: () => any,
}

function ButtonEditText(props: ButtonEditTextProps) {
  return (
    <button className={styles.button}>
      <FontAwesomeIcon icon={props.icon} onClick={props.onClick} />
    </button>
  );
}

export default ButtonEditText;