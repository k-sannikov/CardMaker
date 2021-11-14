import styles from './Button.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
  onClick: (event:any|null) => any,
}

function Button(props: ButtonProps) {
  let style = {};
  if (props.label === '') {
    style = {
      textAlign: 'center',
    }
  }
  return (
    <button
      className={styles.button}
      title={props.title}
      onClick={props.onClick}
      style={style}>
      <FontAwesomeIcon icon={props.icon} />
      {props.label !== '' &&
        <span className={styles.button_text}>{props.label}</span>
      }
    </button>
  );
}

export default Button;