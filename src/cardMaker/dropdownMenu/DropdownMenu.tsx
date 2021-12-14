import styles from './DropdownMenu.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

type DropdownMenuProps = {
  label: string,
  icon: IconDefinition,
  content: React.ReactElement[],
}
function DropdownMenu(props: DropdownMenuProps) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <FontAwesomeIcon icon={props.icon} size="lg" />
        {props.label !== '' &&
          <span className={styles.dropdown_text}>{props.label}</span>
        }
      </button>
      <div className={styles.dropdown_content}>
        {props.content}
      </div>
    </div>
  );
}

export default connect()(DropdownMenu);
