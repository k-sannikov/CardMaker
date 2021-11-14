import styles from './NavButton.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type NavButtonProps = {
  label: string,
  icon: IconDefinition,
  onClick: () => any,
}

function NavButton(props: NavButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
      {props.label !== '' &&
        <span className={styles.button__text}>{props.label}</span>
      }
    </button>
  );
}

export default NavButton;