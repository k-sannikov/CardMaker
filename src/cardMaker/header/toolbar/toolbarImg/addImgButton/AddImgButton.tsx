import styles from './AddImgButton.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type NavButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
  onClick: () => any,
}

function AddImgButton(props: NavButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      title={props.title}>
      <FontAwesomeIcon icon={props.icon} size="lg" />
      {props.label !== '' &&
        <span className={styles.button__text}>{props.label}</span>
      }
    </button>
  );
}

export default AddImgButton;