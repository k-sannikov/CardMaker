import styles from './NavFileButton.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ForwardedRef, forwardRef } from 'react';

type NavFileButtonProps = {
  label: string,
  icon: IconDefinition,
}

const NavFileButton = forwardRef((props: NavFileButtonProps, ref: ForwardedRef<HTMLInputElement>) => (
  <button className={styles.button}>
    <label htmlFor="input-file">
      <FontAwesomeIcon icon={props.icon} />
    </label>
    <input
      className={styles.inputFile}
      type="file"
      ref={ref}
      id="input-file"
    />
    {props.label !== '' &&
      <label className={styles.button__text}
        htmlFor="input-file">
        {props.label}
      </label>
    }
  </button>
));

export default NavFileButton;