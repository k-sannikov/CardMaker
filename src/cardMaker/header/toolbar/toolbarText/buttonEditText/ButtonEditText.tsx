import styles from './ButtonEditText.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ForwardedRef, forwardRef } from 'react';
import { connect } from 'react-redux';

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

export default connect(null, null, null, { forwardRef: true })(ButtonEditText);