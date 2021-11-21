import styles from './ButtonEditText.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ForwardedRef, forwardRef } from 'react';

type ButtonEditTextProps = {
  icon: IconDefinition,
}

const ButtonEditText = forwardRef((props: ButtonEditTextProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <button className={styles.button}
    ref={ref}
  >
    <FontAwesomeIcon icon={props.icon} />
  </button>
));

export default ButtonEditText;